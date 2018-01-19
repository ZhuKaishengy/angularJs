/**
 * 分页类构造
 * 参数 nTotalList: 总条数
 * 参数 nPageSize: 每页显示条数
 * 参数 nPageNum: 当前页码
 * 参数 sPageUrl: 分页链接的URL，页码以[pn]代替，输出时将被替换为实际页码
 * 参数 nPageListSize: 页码列表（下拉框）中显示的最多页码条数。该参数可省略，默认100
 */
function Pagination(nTotalList, nPageSize, nPageNum, sPageUrl, nPageListSize) {
    this.totalList = nTotalList;
    this.pageSize = nPageSize;
    this.pageNum = nPageNum;
    this.psList=[nPageSize];
    if (nTotalList == 0)
        this.totalPages = 1;
    else
        this.totalPages = Math.floor((this.totalList-1)/this.pageSize + 1);
    this.pageUrl = sPageUrl;
    if (arguments[4])
        this.pageListSize = nPageListSize;
    else
        this.pageListSize = 100;
}
/**
 * 设置每页显示数理的可选项数据，以逗号形式分隔，例如："10,50,100,200,500"
 */
Pagination.prototype.setPSList=function(v){
    if(v && v.replace(/(^\s*)|(\s*$)/g,"")!=""){
        this.psList=eval("["+v+"]");
    }
}
/**
 * 生成分页，将HTML直接输出
 * 无参数
 * 无返回值
 */
Pagination.prototype.generate = function() {
    var output = "";
    output += "共 " + this.totalList + " 条 ";
    output += "每页 <select onchange=\"" +
        "location.href='" + this.pageUrl + "'" +
        ".replace(/\\[pn\\]/," + this.pageNum + ")" +
        ".replace(/\\[ps\\]/,this.value)\" align=\"absMiddle\">";
    for(var i=0;i<this.psList.length;i++){
        output += "<option value=\""+this.psList[i]+"\" ";
        if(this.psList[i].toString()==this.pageSize.toString()){
            output += " selected=\"yes\" ";
        }
        output += ">"+this.psList[i]+"</option>";
    }
    output +="</select> 条 当前第";
    output += "<select onchange=\"" +
        "if(this.value)location.href='" + this.pageUrl + "'.replace(/\\[pn\\]/,";
    output += "this.value).replace(/\\[ps\\]/,"+this.pageSize+");\" " +
        "align=\"absMiddle\">";
    var firstPage = this.pageNum - Math.floor(this.pageListSize/2);
    if (firstPage < 1)
        firstPage = 1;
    var lastPage = firstPage + this.pageListSize - 1;
    if (lastPage > this.totalPages) {
        lastPage = this.totalPages;
        firstPage = lastPage - this.pageListSize + 1;
        if (firstPage < 1)
            firstPage = 1;
    }
    if (firstPage > 1) {
        output += "<option value=\"1\">1</option>";
        if (firstPage > 2)
            output += "<option value=\"\">…</option>";
    }
    for (var p = firstPage; p <= lastPage; p++) {
        output += "<option value=\"" + p + "\"";
        if (p == this.pageNum)
            output += " selected=\"yes\"";
        output += ">" + p + "</option>";
    }
    if (lastPage < this.totalPages) {
        if (lastPage < this.totalPages - 1)
            output += "<option value=\"\">…</option>";
        output += "<option value=\"" + this.totalPages + "\">" + this.totalPages + "</option>";
    }
    if (this.pageNum > this.totalPages)
        output += "<option value=\"\" selected=\"yes\">页码超出范围</option>";
    output += "</select>";
    output += "/" + this.totalPages + " 页 ";
    if (this.pageNum == 1) {
        output += "<a class=\"pageTd\" href=\"javascript:void(0);\">[首页]</a> ";
        output += "<a class=\"pageTd\" href=\"javascript:void(0);\">[上页]</a> ";
    }
    else {
        output += "<a class=\"pageTt\" href=\"" + this.pageUrl.replace(/\[pn\]/, "1").replace(/\[ps\]/, this.pageSize) + "\" target=\"_self\">[首页]</a> ";
        output += "<a class=\"pageTu\" href=\"" + this.pageUrl.replace(/\[pn\]/, this.pageNum-1).replace(/\[ps\]/, this.pageSize) + "\" target=\"_self\">[上页]</a> ";
    }
    if (this.pageNum == this.totalPages) {
        output += "<a class=\"pageTd\" href=\"javascript:void(0);\">[下页]</a> ";
        output += "<a class=\"pageTd\" href=\"javascript:void(0);\">[尾页]</a>";
    }
    else {
        output += "<a class=\"pageTd\" href=\"" + this.pageUrl.replace(/\[pn\]/, this.pageNum+1).replace(/\[ps\]/, this.pageSize) + "\" target=\"_self\">[下页]</a> ";
        output += "<a class=\"pageTe\" href=\"" + this.pageUrl.replace(/\[pn\]/, this.totalPages).replace(/\[ps\]/, this.pageSize) + "\" target=\"_self\">[尾页]</a> ";
    }
    document.writeln(output);
}
