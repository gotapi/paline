# Paline 

Paline 是一个基于gotapi的存储后端的一个评论系统，从 [Valine](https://github.com/xCss/Valine) 改写而来。

valine本身是一个很好的评论系统，但是我觉得他有两个缺点：

- 一个是基于leancloud,这样就不得不引入leancloud的sdk,导致文件太大；
- 另一个是引入了marked,也是一样的问题，导致最终生成的js太大。

我重写了valine的部分逻辑，去掉了marked,axios,leancloud的依赖，改为把数据存储在 gotapi.net 提供的后端上。

如果已经用了valine,那只能继续用valine,因为目前暂时还没有写迁移评论的脚本。