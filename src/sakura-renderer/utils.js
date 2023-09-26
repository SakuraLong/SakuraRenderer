/**
 * 非贪婪替换
 * 匹配替换最外层的内容
 * 项目里面没有特殊说明不用这个
 * code ignore 用这个检索
 * @param {String} string_begin 匹配开始字符串
 * @param {String} string_end 匹配结束字符串
 * @param {String} content 检查的内容
 * @param {Function} func 处理内容的函数，会传入入参以及匹配的内容，需要返回匹配的替换的结果
 * @returns
 */
function replaceNonGreed(string_begin, string_end, content, func) {
    let res = {
        replace: false,
        content: content,
    };
    let left_index = 0; // string_begin检索的位置
    let right_index = 0; // string_end检索的位置
    let left_index_list = []; // 匹配到左字符串的下标位置数组
    let right_index_list = []; // 匹配到右字符串的下标位置数组
    let h = 0; // 防止死循环
    while (content.indexOf(string_begin, left_index) !== -1) {
        if (++h > 10000) break;
        left_index = content.indexOf(string_begin, left_index);
        left_index_list.push(left_index);
        left_index += string_begin.length;
    }
    h = 0;
    while (content.indexOf(string_end, right_index) !== -1) {
        if (++h > 10000) break;
        right_index = content.indexOf(string_end, right_index);
        right_index_list.push(right_index);
        right_index += string_end.length;
    }
    if (left_index_list.length === 0 || right_index_list.length === 0) return res; // 匹配失败
    right_index_list.reverse(); // 反转 最大排在最前
    h = 0;
    while (
        left_index_list[0] < right_index_list[0] &&
        left_index_list.length !== right_index_list.length
    ) {
        if (++h > 10000) break;
        if (left_index_list.length > right_index_list.length)
            left_index_list.shift();
        else right_index_list.shift();
    }
    if(left_index_list[0] >= right_index_list[0]) return res; // 匹配失败
    left_index = left_index_list[0];
    right_index = right_index_list[0];
    let temp = content.slice(left_index, right_index + string_end.length); // 不一定唯一，但一定是最先检索到
    content = content.replace(
        temp,
        func({
            stringBegin: string_begin,
            stringEnd: string_end,
            content: content,
            replace: temp,
        })
    );
    res.replace = true;
    res.content = content;
    return res;
}

/**
 * 贪婪替换
 * 匹配替换最内层的内容
 * 项目里面用这个为主
 * @param {String} string_begin 匹配开始字符串
 * @param {String} string_end 匹配结束字符串
 * @param {String} content 检查的内容
 * @param {Function} func 处理内容的函数，会传入入参以及匹配的内容，需要返回匹配的替换的结果
 * @returns
 */
function replaceGreed(string_begin, string_end, content, func) {
    let res = {
        replace: false,
        content: content,
    };
    let left_index = 0; // string_begin检索的位置
    let right_index = 0; // string_end检索的位置
    let left_index_list = []; // 匹配到左字符串的下标位置数组
    let right_index_list = []; // 匹配到右字符串的下标位置数组
    let h = 0; // 防止死循环
    while (content.indexOf(string_begin, left_index) !== -1) {
        if (++h > 10000) break;
        left_index = content.indexOf(string_begin, left_index);
        left_index_list.push(left_index);
        left_index += string_begin.length;
    }
    h = 0;
    while (content.indexOf(string_end, right_index) !== -1) {
        if (++h > 10000) break;
        right_index = content.indexOf(string_end, right_index);
        right_index_list.push(right_index);
        right_index += string_end.length;
    }
    if (left_index_list.length === 0 || right_index_list.length === 0) return res; // 匹配失败
    right_index_list.reverse(); // 反转 最大排在最前
    h = 0;
    while (
        left_index_list[0] < right_index_list[0] &&
        left_index_list.length !== right_index_list.length
    ) {
        if (++h > 10000) break;
        if (left_index_list.length > right_index_list.length)
            left_index_list.shift();
        else right_index_list.shift();
    }
    if(left_index_list[0] >= right_index_list[0]) return res; // 匹配失败
    left_index = left_index_list[left_index_list.length - 1];
    right_index = right_index_list[right_index_list.length - 1];
    let temp = content.slice(left_index, right_index + string_end.length); // 不一定唯一，但一定是最先检索到
    content = content.replace(
        temp,
        func({
            stringBegin: string_begin,
            stringEnd: string_end,
            content: content,
            replace: temp,
        })
    );
    res.replace = true;
    res.content = content;
    return res;
}

export default {
    replaceNonGreed,
    replaceGreed
};
