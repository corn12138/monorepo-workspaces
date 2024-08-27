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
                urls: [""],
                direction: "horizontal",
                type: "",
            }
        }
    }
]; 