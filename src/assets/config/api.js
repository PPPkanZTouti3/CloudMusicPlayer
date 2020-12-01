const ApiRootUrl = "http://47.95.229.102:8081";

module.exports = {
    //User
    Login: ApiRootUrl + "/user/login", //登录时验证账户
    Register: ApiRootUrl + "/user/register", //注册时验证用户名或邮箱是否存在
    FindPassword: ApiRootUrl + "/user/findPassword", //找回密码
    ModifyUserInfo: ApiRootUrl + "/user/modify", //返回用户的信息用于修改

    //Music
    GetMusicById: ApiRootUrl + "/music/",
    AllMusic: ApiRootUrl + "/music",
    SearchMusic: ApiRootUrl + "/music/search", //通过歌名，歌手查找歌曲
    Upload: ApiRootUrl + "/music/upload", //上传下音乐
    UploadByUrl: ApiRootUrl + "/music/uploadByUrl",
    UpdateMusic: ApiRootUrl + "/music/update",
    DeleteMusicById: ApiRootUrl + "/music/delete/",

    //MusicList
    GetUserMusicList: ApiRootUrl + "/list/",
    GetDetailMusic: ApiRootUrl + "/list/getDetails",
    AddList: ApiRootUrl + "/list/add",
    UpdateList: ApiRootUrl + "/list/update",
    AddMusicToList: ApiRootUrl + "/list/addMusic",
    DeleteMusicInList: ApiRootUrl + "/list/deleteMusic",
    DeleteListById: ApiRootUrl + "/list/delete/",

    //BackgroundPicture
    GetImgByUserId: ApiRootUrl + "/backgroundPicture/",
    UploadImg: ApiRootUrl + "/backgroundPicture/upload",
    DeleteImgByUserId: ApiRootUrl + "/backgroundPicture/delete/"
}