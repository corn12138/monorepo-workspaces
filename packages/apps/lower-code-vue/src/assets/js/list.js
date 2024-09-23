export const toolsList = [
    {
        icon: "/images/title_text.svg",
        title: "标题文本",
        limit: 100,
        componentName: "TitleText",
        componentSchema: {
            name: "标题文本",
            componentName: "TitleText",
            configComponentName: "TitleTextConfig",
            settings: {
                content: "这是一个标题文本",
                style: {
                    textAlign: "left",
                    fontSize: "14px",
                    fontWeight: "bold",
                    color: "#333" // 完全符合style css属性驼峰书写
                }
            }
        }
    },
    {
        icon: "/images/image.svg",
        title: "图片",
        limit: 500,
        componentName: "Image",
        componentSchema: {
            name: "图片",
            componentName: "Image",
            configComponentName: "ImageConfig",
            settings: {
                url: "",
                style: {
                    borderRadius: "4px"
                }
            }
        }
    },
    {
        icon: "/images/space.svg",
        title: "空白",
        limit: 1000,
        componentName: "Space",
        componentSchema: {
            name: "空白",
            componentName: "Space",
            configComponentName: "SpaceConfig",
            settings: {
                style: {
                    height: 30
                }
            }
        }
    },
    {
        icon: "/images/carousel.svg",
        title: "轮播",
        limit: 5,
        componentName: "Carousel",
        componentSchema: {
            name: "轮播",
            componentName: "Carousel",
            configComponentName: "CarouselConfig",
            settings: {
                urls: ["789"],
                direction: "horizontal",
                type: "",
            }
        }
    },
    {
        icon: "/images/carousel.svg",
        title: "布局",
        limit: 5,
        componentName: "Layout",
        componentSchema: {
            name: "布局",
            componentName: "Layout",
            configComponentName: "LayoutConfig",
            settings: {
                layoutList: [
                    {
                        customize: false,
                        label: "一行两列",
                        icon: "/images/layout.svg",
                        gridCount: 2, // 一行几个
                        areas: [
                            { startX: 0, startY: 0, endX: 0, endY: 1, url: "" }, // 从0开始
                            { startX: 1, startY: 0, endX: 1, endY: 1 }
                        ]
                    },
                    {
                        customize: false,
                        label: "一行三列",
                        icon: "/images/layout.svg",
                        gridCount: 3, // 一行几个
                        areas: [
                            { startX: 0, startY: 0, endX: 0, endY: 2 }, // 从0开始
                            { startX: 1, startY: 0, endX: 1, endY: 2 },
                            { startX: 2, startY: 0, endX: 2, endY: 2 }
                        ]
                    },
                    {

                        customize: false,
                        label: "一行四列",
                        icon: "/images/layout.svg",
                        gridCount: 4, // 一行几个
                        areas: [
                            { startX: 0, startY: 0, endX: 0, endY: 3 }, // 从0开始
                            { startX: 1, startY: 0, endX: 1, endY: 3 },
                            { startX: 2, startY: 0, endX: 2, endY: 3 },
                            { startX: 3, startY: 0, endX: 3, endY: 3 }
                        ]
                    }
                    // {
                    //     gridCount: 7, // 一行几个
                    //     areas: [
                    //         { startX: 0, startY: 0, endX: 1, endY: 1 }
                    //     ]
                    // },
                    // {

                    // }
                ],
                settings: {
                    isCustom: false,
                    gridCount: 2, // 一行几个
                    areas: [
                        { startX: 0, startY: 0, endX: 0, endY: 1, url: "" }, // 从0开始
                        { startX: 1, startY: 0, endX: 1, endY: 1 }
                    ]
                }
            }
        }
    }
]; 