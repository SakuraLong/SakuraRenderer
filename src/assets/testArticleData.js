const test_article_data_list = [
    {
        type: "sr-title",
        data: {
            type: "h1",
            content: "标题",
            id: "title_id1",
            option: {
                textAlign: "left",
                borderPosition: "left",
                hoverAnimation: false,
                hasLink: true,
            },
        },
    },
    {
        type: "sr-title",
        data: {
            type: "h2",
            content: "标题标题标题",
            id: "title_id2",
            option: {
                textAlign: "center",
                borderPosition: "bottom",
                hoverAnimation: true,
                hasLink: false,
            },
        },
    },
    {
        type: "sr-title",
        data: {
            type: "h3",
            content: "标题33333333333",
            id: "title_id3",
            option: {
                textAlign: "left",
                borderPosition: "none",
                hoverAnimation: true,
                hasLink: true,
            },
        },
    },
];

const article = 
`
配置项
配置项
|-
== 标题

=== $x+y=\\Delta$

= $$x+y=z$$

段落1段落1段落1段落1段落1

{|表格
|}

<poem>
asuinsac

sacasc


ascasc



ascsac

sacasc
</poem>

{|title|type=h1
|class=class1;class2
|ta=l|bp=l|ha
|class=class3;class4
|style=color:red;
|-
|不知道写啥
|}

{|albumIS
|class=class1;class2
|width=200px
|imgW=100px
|imgH=x200px
|-
|https://img.moegirl.org.cn/common/thumb/b/b4/16bitsensation_al_KV.jpg/420px-16bitsensation_al_KV.jpg
|https://lupic.cdn.bcebos.com/20220107/3086034705_23_600_261.jpg
|https://lupic.cdn.bcebos.com/20191203/3016196694_23.jpg
|}
`;

export default {
    test_article_data_list,
    article
};
