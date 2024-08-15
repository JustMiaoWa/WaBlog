---
title: Java项目中集成Minio，构建高效分布式对象存储解决方案
tags:
  - 后端开发
  - Minio
  - Springboot
  - Java
  - 对象存储
recommend: true
categories: 后端开发
abbrlink: 3c427404
date: 2024-08-17 13:33:41
cover: https://image.wazicode.top/blog/202408181557523.png
---

# Java项目中集成Minio，构建高效分布式对象存储解决方案

> 如果您觉得这篇文章有帮助的话！给个点赞和评论支持下吧，感谢~
>
> 作者：哇子
>
> IT技术(摸鱼)交流QQ群：374984174



## Minio介绍

官方解释：MinIO 是一个基于Apache License v2.0开源协议的对象存储服务，基于Golang 编程语言开发。它兼容亚马逊S3云存储服务接口，非常适合于存储大容量非结构化的数据，例如图片、视频、日志文件、备份数据和容器/虚拟机镜像等，而一个对象文件可以是任意大小，从几kb到最大5T不等。支持单个最大存储对象为50TB。

也许提起对象存储技术，我们都经历过Fastdfs长时间的拉锯战，即使现在大部分都在使用云服务厂商提供的OSS对象存储服务，但是其所花费的经济成本也是递增的，而且数据都存储在别人的服务器上，从一定程度上来说，对于文件资源的把控粒度是极其不可控制，公网数据是何其的没有隐私可言。虽然，对于开发层面上来说，只需要整合对应的SDK，对其使用已经是开箱即用。但是，对于选择自研对象存储技术来说，Minio何尝不失为一大利器。
其搭建过程与整合方面，几乎已经没有什么瓶颈可言。不论是从传统服务器的安装，还是基于Docker以及Kubernetes的部署，简直简单得不要不要的。及其优势也是很多的：



1. 海量存储：Minio支持大规模数据存储，可以轻松应对PB级别的数据量。
2. 弹性扩展：Minio的容量和处理能力可以弹性扩展，满足不同业务的需求。
3. 多存储类型：Minio支持块存储、文件存储和对象存储等多种存储类型，可根据实际需求选择。
4. 高可用性：Minio具备高可用性特点，能够保证数据的[安全](https://cloud.baidu.com/solution/security/soc.html)性和可靠性。
5. 低成本：Minio全面优化了存储成本，为企业节省了大量的存储费用。



官网文档地址：https://docs.min.io/cn/



Minio支持独立部署和分布式部署，我们先看看单机部署，后面再讲分布式部署

- **独立部署**：具有单个存储卷或文件夹的单个 MinIO 服务器。独立部署最适合使用 MinIO 进行对象存储的应用程序的评估和初始开发，或为单个存储卷提供 S3 访问层。独立部署不提供对全套 MinIO 高级 S3 特性和功能的访问。
- **分布式部署**：一台或多台 MinIO 服务器，所有服务器上至少有四个总存储卷。分布式部署最适合生产环境和工作负载，并支持 MinIO 的所有核心和高级 S3 特性和功能。对于生产环境，MinIO 建议使用 4 个节点和 4 个驱动器的基线拓扑。

## Linux安装Minio

### 1、准备安装文件

```shell
cd  /home/minio
#在线下载二进制文件
wget https://dl.min.io/server/minio/release/linux-amd64/minio
```

### 2、安装

#### 2.1 赋权

```shell
#提权
chmod +x minio
```

#### 2.2 设置临时用户名、密码（重启后会失效）

```shell
#旧版使用 MINIO_ACCESS_KEY MINIO_SECRET_KEY，作废时间：Deprecated since version RELEASE.2021-04-22T15-44-28Z.
#新版 配置用户名密码
export MINIO_ROOT_USER=minioadmin
export MINIO_ROOT_PASSWORD=yourpassword

#查看环境变量
echo $MINIO_ROOT_USER
echo $MINIO_ROOT_PASSWORD
```

#### 2.3 设置永久环境变量

```shell
# 修改系统配置
vim /etc/profile

#最后一行输入(新版) 
export MINIO_ROOT_USER=admin
export MINIO_ROOT_PASSWORD=password

# 设置立即生效
source /etc/profile
```

#### 2.4 创建存储目录及日志文件

```shell
#创建存储目录
mkdir -p  /home/minio/data
#进入
cd /home/minio
#创建日志文件
touch minio.log
```

### 3、后台启动

```shell
nohup /home/minio/minio server --address :9800 --console-address :9889 /home/minio/data >/home/minio/minio.log 2>&1 &
```

```shell
备注
   nohup：后台启动
   ./minio server：启动命令
   --address :9800：指定API端口
   --console-address :9889：指定控制台端口
  /home/minio/data：指定存储目录
  >/home/minio/minio.log 2>&1 ：控制台日志重定向到/home/minio/minio.log文件中
  &：后台运行
```

### 4、网页登录

地址：主机IP:9889

密码为之前设置的admin账号

此处新建的管理员用户用于Nacos配置文件中配置Minio的账户，不能使用默认管理员账号的原因有以下两点，一是不安全，二是Minio如果宕机重启后默认的用户名和密码会变成minioadmin

，所以需要手动创建一个管理员用户。

### 5、防止服务宕机可用性，设置Minio开机自启

```shell
 cd /etc/rc.d/init.d
 #新建shell脚本文件
 vi startMinio.sh
```

写入以下内容：

```shell
nohup /home/minio/minio server --address :9800 --console-address :9889 /home/minio/data >/home/minio/minio.log 2>&1 &
```

配置开机自启：

```shell
#给shell脚本赋权
chmod +x startMinio.sh
#添加到开机自启动服务中
chkconfig --add startMinio.sh
#设置开机自启动
chkconfig startMinio.sh on
#查看是否添加成功
chkconfig --list
```

## Docker安装Minio

docker上使用minio较多的镜像是bitnami/minio` 和 `minio/minio  ，他们都用于部署minio对象存储服务，但是存在以下区别：

**维护者**：

- `minio/minio`：是官方团队提供的镜像，包含minio运行环境和程序本身
- `bitnami/minio`：是bitnami团队基于minio官方版本进行了封装和优化，提供一种更易于部署、管理和监控的解决方案

**默认配置与管理工具**：

- `minio/minio` 镜像需要手动通过命令行或环境变量来配置 MinIO 的访问密钥、机密密钥和其他参数。
- `bitnami/minio` 提供了友好的默认配置，并且可能通过自定义的启动脚本来简化配置过程，同时 Bitnami 的容器通常会有一个更全面的应用生命周期管理工具集。

如果你希望获得一个更易部署和管理的 MinIO 部署方案，`bitnami/minio` 可能是一个更好的选择；而如果想要一个纯净、轻量级的 MinIO 实现，可以直接采用 `minio/minio` 镜像。

我们这里直接使用`bitnami/minio`。

### 1、搜索镜像

```shell
docker search minio
```

![image-20240818210341321](https://image.wazicode.top/blog/202408182103553.png)

可以看到minio使用量比较多的bitnami团队的镜像

### 2、拉取镜像

```shell
docker pull bitnami/minio:2024.7.4
```

可以查看下镜像

```shell
docker images
```

### 3、运行镜像

先创建配置文件和存储数据的目录，用于将容器内的数据挂载到宿主机

```shell
## 创建存放minio配置文件的目录
mkdir -p /home/docker/minio/config
## 创建存放minio存储数据的目录
mkdir -p /home/docker/minio/data
```

```shell
docker run \
-p 9000:9000 \
-p 9001:9001 \
--net=host \
--name minio \
-d --restart=always \
-e "MINIO_ROOT_USER=minioadmin" \
-e "MINIO_ROOT_PASSWORD=minioadmin" \
-v /etc/timezone/timezone:/etc/timezone \
-v /etc/localtime:/etc/localtime:ro \
-v /home/minio/data:/bitnami/minio/data \
-v /home/minio/config:/root/.minio \
bitnami/minio:2024.7.4
```

```shell
注释解释：
-p 9000:9000	这是minio的API接口端口映射
-p 9001:9001	这是minio的客户端浏览器页面访问端口映射
--net=host	这是网络设置，表示容器将使用主机的网络栈
--name minio	自定义容器名称
-d --restart=always	-d 使容器在后台运行，–restart=always 表示容器总是会在退出后自动重启
-e "MINIO_ROOT_USER=minio" 	设置用户名
-e "MINIO_ROOT_PASSWORD=minioadmin" 	设置密码，密码长度最少8位，否则会报错！！！！！
-v /etc/timezone/timezone:/etc/timezone
-v /etc/localtime:/etc/localtime:ro	同步宿主机的时间
-v /home/minio/data:/bitnami/minio/data	 映射minio存储的数据文件到宿主机目录
-v /home/minio/config:/root/.minio 	映射minio的配置文件到宿主机目录
server /data：参数指定了MinIO服务器的配置。"/data"是MinIO服务器将用于存储数据的目录路径。

--console-address ":9000"：指定MinIO控制台端口，确保任何尝试连接到这个端口的客户端或应用程序都可以使用这个端口

--address ":9001"：指定MinIO服务端口，将Docker守护程序绑定到指定的端口上
```

如果遇到无法启动容器，是因为centos7.6中没有timezone文件，可以执行以下命令

```shell
echo 'Asia/Shanghai' > /etc/timezone/timezone
```

要确保挂载目录有权限哦，不然会报错。启动好docker后需等待一段时间后才可访问webUI，应该是minio启动需要配置很多东西。可以使用docker日志查看minio启动日志

```shell
docker logs 容器ID
```

```shell
日志内容：
minio 23:19:24.93 INFO  ==> ** Starting MinIO **
MinIO Object Storage Server
Copyright: 2015-2024 MinIO, Inc.
License: GNU AGPLv3 - https://www.gnu.org/licenses/agpl-3.0.html
Version: DEVELOPMENT.2024-07-04T14-25-45Z (go1.21.12 linux/amd64)

API: http://localhost:9000 
WebUI: http://172.17.0.2:9001 http://127.0.0.1:9001   

Docs: https://min.io/docs/minio/linux/index.html
Status:         1 Online, 0 Offline. 
STARTUP WARNINGS:
- Detected Linux kernel version older than 4.0.0 release, there are some known potential performance problems with this kernel version. MinIO recommends a minimum of 4.x.x linux kernel version for best performance
- Detected default credentials 'minioadmin:minioadmin', we recommend that you change these values with 'MINIO_ROOT_USER' and 'MINIO_ROOT_PASSWORD' environment variables
- The standard parity is set to 0. This can lead to data loss.

 You are running an older version of MinIO released 1 month before the latest release 

```

使用初始密码可登录webUI，建议初始化后立即创建管理员用户。

## Springboot集成Minio操作

minio中文文档：https://www.bookstack.cn/read/MinioCookbookZH/22.md

### 1、springboot的pom依赖

```xml
<dependencies>
        <!--spring-boot-starter-web 依赖-->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>

        <!-- https://mvnrepository.com/artifact/io.minio/minio -->
        <dependency>
            <groupId>io.minio</groupId>
            <artifactId>minio</artifactId>
            <version>8.4.0</version>
        </dependency>

        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <version>1.18.10</version>
            <scope>provided</scope>
        </dependency>

        <!-- https://mvnrepository.com/artifact/commons-lang/commons-lang -->
        <dependency>
            <groupId>commons-lang</groupId>
            <artifactId>commons-lang</artifactId>
            <version>2.6</version>
        </dependency>
    </dependencies>
```

### 2、配置文件

```yaml
minio:
  endpoint: http://192.168.0.200:9000 #Minio服务所在地址
  bucketName: mytest #存储桶名称
  accessKey: TAP1Ec9o9ROxNl6brDMJ #访问的key
  secretKey: 7MEy6GqsY90eopZvkBZQdiKDBhjGHrM00KLPkIb2 #访问的秘钥
```

### 3、Minio工具类

```java
@Component
public class MinioUtil {
    @Autowired
    private MinioConfig prop;

    @Resource
    private MinioClient minioClient;

    /**
     * 查看存储bucket是否存在
     * @return boolean
     */
    public Boolean bucketExists(String bucketName) {
        Boolean found;
        try {
            found = minioClient.bucketExists(BucketExistsArgs.builder().bucket(bucketName).build());
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
        return found;
    }

    /**
     * 创建存储bucket
     * @return Boolean
     */
    public Boolean makeBucket(String bucketName) {
        try {
            minioClient.makeBucket(MakeBucketArgs.builder()
                    .bucket(bucketName)
                    .build());
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
        return true;
    }
    /**
     * 删除存储bucket
     * @return Boolean
     */
    public Boolean removeBucket(String bucketName) {
        try {
            minioClient.removeBucket(RemoveBucketArgs.builder()
                    .bucket(bucketName)
                    .build());
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
        return true;
    }
    /**
     * 获取全部bucket
     */
    public List<Bucket> getAllBuckets() {
        try {
            List<Bucket> buckets = minioClient.listBuckets();
            return buckets;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }



    /**
     * 文件上传
     *
     * @param file 文件
     * @return Boolean
     */
    public String upload(MultipartFile file) {
        String originalFilename = file.getOriginalFilename();
        if (StringUtils.isBlank(originalFilename)){
            throw new RuntimeException();
        }
        String fileName = generateUUIDWithoutDashes() + originalFilename.substring(originalFilename.lastIndexOf("."));
        String objectName = formatTodayDate("yyyy-MM/dd") + "/" + fileName;
        try {
            PutObjectArgs objectArgs = PutObjectArgs.builder().bucket(prop.getBucketName()).object(objectName)
                    .stream(file.getInputStream(), file.getSize(), -1).contentType(file.getContentType()).build();
            //文件名称相同会覆盖
            minioClient.putObject(objectArgs);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
        return objectName;
    }

    /**
     * 预览图片
     * @param fileName
     * @return
     */
    public String preview(String fileName){
        // 查看文件地址
        GetPresignedObjectUrlArgs build = new GetPresignedObjectUrlArgs().builder().bucket(prop.getBucketName()).object(fileName).method(Method.GET).build();
        try {
            String url = minioClient.getPresignedObjectUrl(build);
            return url;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    /**
     * 文件下载
     * @param fileName 文件名称
     * @param res response
     * @return Boolean
     */
    public void download(String fileName, HttpServletResponse res) {
        GetObjectArgs objectArgs = GetObjectArgs.builder().bucket(prop.getBucketName())
                .object(fileName).build();
        try (GetObjectResponse response = minioClient.getObject(objectArgs)){
            byte[] buf = new byte[1024];
            int len;
            try (FastByteArrayOutputStream os = new FastByteArrayOutputStream()){
                while ((len=response.read(buf))!=-1){
                    os.write(buf,0,len);
                }
                os.flush();
                byte[] bytes = os.toByteArray();
                res.setCharacterEncoding("utf-8");
                // 设置强制下载不打开
                // res.setContentType("application/force-download");
                res.addHeader("Content-Disposition", "attachment;fileName=" + fileName);
                try (ServletOutputStream stream = res.getOutputStream()){
                    stream.write(bytes);
                    stream.flush();
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    /**
     * 查看文件对象
     * @return 存储bucket内文件对象信息
     */
    public List<Item> listObjects() {
        Iterable<Result<Item>> results = minioClient.listObjects(
                ListObjectsArgs.builder().bucket(prop.getBucketName()).build());
        List<Item> items = new ArrayList<>();
        try {
            for (Result<Item> result : results) {
                items.add(result.get());
            }
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
        return items;
    }

    /**
     * 删除
     * @param fileName
     * @return
     * @throws Exception
     */
    public boolean remove(String fileName){
        try {
            minioClient.removeObject( RemoveObjectArgs.builder().bucket(prop.getBucketName()).object(fileName).build());
        }catch (Exception e){
            return false;
        }
        return true;
    }

    // 封装生成不带横杠UUID的方法
    public static String generateUUIDWithoutDashes() {
        String uuid = UUID.randomUUID().toString();
        return uuid.replaceAll("-", "");
    }

    // 封装格式化今天日期的方法
    public static String formatTodayDate(String format) {
        // 定义日期格式
        SimpleDateFormat formatter = new SimpleDateFormat(format);

        // 获取今天的日期
        Date today = new Date();

        // 格式化日期并返回
        return formatter.format(today);
    }

}
```

### 4、接口Controller

```java
@Api(tags = "文件相关接口")
@Slf4j
@RestController
@RequestMapping(value = "product/file")
public class FileController {


    @Autowired
    private MinioUtil minioUtil;
    @Autowired
    private MinioConfig prop;

    @ApiOperation(value = "查看存储bucket是否存在")
    @GetMapping("/bucketExists")
    public R bucketExists(@RequestParam("bucketName") String bucketName) {
        return R.ok().put("bucketName",minioUtil.bucketExists(bucketName));
    }

    @ApiOperation(value = "创建存储bucket")
    @GetMapping("/makeBucket")
    public R makeBucket(String bucketName) {
        return R.ok().put("bucketName",minioUtil.makeBucket(bucketName));
    }

    @ApiOperation(value = "删除存储bucket")
    @GetMapping("/removeBucket")
    public R removeBucket(String bucketName) {
        return R.ok().put("bucketName",minioUtil.removeBucket(bucketName));
    }

    @ApiOperation(value = "获取全部bucket")
    @GetMapping("/getAllBuckets")
    public R getAllBuckets() {
        List<Bucket> allBuckets = minioUtil.getAllBuckets();
        return R.ok().put("allBuckets",allBuckets);
    }

    @ApiOperation(value = "文件上传返回url")
    @PostMapping("/upload")
    public R upload(@RequestParam("file") MultipartFile file) {
        String objectName = minioUtil.upload(file);
        if (null != objectName) {
            return R.ok().put("url",(prop.getEndpoint() + "/" + prop.getBucketName() + "/" + objectName));
        }
        return R.error();
    }

    @ApiOperation(value = "图片/视频预览")
    @GetMapping("/preview")
    public R preview(@RequestParam("fileName") String fileName) {
        return R.ok().put("filleName",minioUtil.preview(fileName));
    }

    @ApiOperation(value = "文件下载")
    @GetMapping("/download")
    public R download(@RequestParam("fileName") String fileName, HttpServletResponse res) {
        minioUtil.download(fileName,res);
        return R.ok();
    }

    @ApiOperation(value = "删除文件", notes = "根据url地址删除文件")
    @PostMapping("/delete")
    public R remove(String url) {
        String objName = url.substring(url.lastIndexOf(prop.getBucketName()+"/") + prop.getBucketName().length()+1);
        minioUtil.remove(objName);
        return R.ok().put("objName",objName);
    }

}
```



































