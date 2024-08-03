import "cropperjs/dist/cropper.css"; // 引入样式
import "./index.css"; // 引入样式
import Cropper from "cropperjs"; // 引入库 --剪裁

class LcCropperScreenshot {
    constructor(imageElement, options = {}) {
        this.cropper = null;
        this.imageElement = imageElement;
        this.imageRect = imageElement.getBoundingClientRect();  // 图片的位置信息
        this.onCropperEnd = options.onCropperEnd || function () { };// 裁剪结束的回调
        this.onCropperCancel = options.onCropperCancel || function () { };// 取消裁剪的回调
        this.createButtons(); // 创建按钮
    };
    // 初始化裁剪
    initializeCropper(imageElement) {

        if (this.cropper) {
            this.cropper.replace(imageElement.src); // 替换图片
        } else {
            const aspectRatio = this.imageRect.width / this.imageRect.height; // 图片的宽高比
            this.cropper = new Cropper(imageElement, {
                aspectRatio: aspectRatio, // 裁剪框的宽高比
                autoCrop: false, // 是否自动裁剪
                zoomable: false, // 是否可以缩放
                movable: false, // 是否可以移动
                rotatable: false, // 是否可以旋转
                scalable: false, // 是否可以缩放
                viewMode: 1, // 裁剪框的显示模式
                zoomOnWheel: false, // 是否可以通过滚轮缩放
                background: false, // 是否显示背景
                cropend: (event) => {// 裁剪结束时的回调
                    this.onCropperEnd(event);
                },
                cropmove: (event) => {// 裁剪框改变时的回调
                    console.log(event.detail.x);
                    console.log(event.detail.y);
                    console.log(event.detail.width);
                    console.log(event.detail.height);
                },
                crop: (event) => {// 裁剪框改变时的回调
                    console.log(event.detail.x);
                    console.log(event.detail.y);
                    console.log(event.detail.width);
                    console.log(event.detail.height);
                }
            });
        }
    }

    createButtons() {
        // 创建按钮容器
        const buttonsContainer = document.createElement("div");
        //  添加样式
        buttonsContainer.classList.add("cropper_buttons");
        buttonsContainer.style.display = "none";
        // 创建下载按钮
        const downloadBtn = document.createElement("div");
        downloadBtn.classList.add("cropper_button");
        downloadBtn.classList.add("download_button");
        downloadBtn.addEventListener("click", () => {
            this.downloadCroppedImage();
        });
        // 创建取消按钮
        const cancelBtn = document.createElement("div");
        // 添加样式
        cancelBtn.classList.add("cropper_button");
        // 添加样式
        cancelBtn.classList.add("cancel_button");
        cancelBtn.addEventListener("click", () => {
            this.cancelCrop();
        });
        // 创建重新裁剪按钮
        const recropBtn = document.createElement("div");
        recropBtn.classList.add("cropper_button");
        recropBtn.classList.add("recrop_button");
        recropBtn.addEventListener("click", () => {
            this.recrop();
        });
        // 创建确认按钮
        const confirmBtn = document.createElement("div");
        confirmBtn.classList.add("cropper_button");
        confirmBtn.classList.add("confirm_button");
        confirmBtn.addEventListener("click", () => {
            this.confirmCrop();
        });
        // 添加按钮
        buttonsContainer.appendChild(recropBtn);
        buttonsContainer.appendChild(downloadBtn);
        buttonsContainer.appendChild(cancelBtn);
        buttonsContainer.appendChild(confirmBtn);
        // 添加到body
        document.body.appendChild(buttonsContainer);
        // 保存按钮容器
        this.buttonsContainer = buttonsContainer;
    }
    // 更新按钮的位置
    updateButtonsPosition() {
        const cropBoxData = this.cropper.getCropBoxData(); // 裁剪框的位置信息
        const offsetX = this.imageRect.x // 图片的x坐标
        const offsetY = this.imageRect.y // 图片的y坐标
        const buttonsLen = this.buttonsContainer.getBoundingClientRect().width || 192; // 按钮的宽度
        this.buttonsContainer.style.left = `${cropBoxData.left + offsetX + cropBoxData.width - buttonsLen}px`; // 按钮的x坐标
        this.buttonsContainer.style.top = `${cropBoxData.top + offsetY + 10}px`; // 按钮的y坐标
    }
    //显示按钮
    showButtons() {
        this.buttonsContainer.style.display = "flex";
    }
    //隐藏按钮
    hideButtons() {
        this.buttonsContainer.style.display = "none";
    }
    //下载裁剪后的图片
    downloadCroppedImage() {
        const canvas = this.cropper.getCroppedCanvas(); // 获取裁剪后的canvas
        const link = document.createElement("a");
        link.href = canvas.toDataURL('image/jpeg'); // 转换为base64
        link.download = "cropped_image.png"; // 下载的文件名
        link.click(); // 触发下载
        // const url = canvas.toDataURL(); // 转换为base64
        // const a = document.createElement("a");
        // a.href = url;
        // a.download = "cropped_image.png";
        // a.click();
    }
    //取消裁剪
    cancelCrop() {
        this.onCropperCancel();// 取消裁剪的回调
        this.destroy(); // 销毁
    }
    recrop() {
        this.cropper.clear(); // 清除裁剪框
        this.hideButtons(); // 隐藏按钮
    }

    //确认裁剪
    confirmCrop() {
        const canvas = this.cropper.getCroppedCanvas(); // 获取裁剪后的canvas
        const croppedData = canvas.toDataURL('image/jpeg'); // 转换为base64
        this.onCropperEnd(croppedData); // 裁剪结束的回调
        this.destroy(); // 销毁
    }
    //销毁
    destroy() {
        if (this.cropper) {
            this.cropper.destroy(); // 销毁裁剪框
            this.cropper = null;
        }
        if (this.buttonsContainer) {
            this.buttonsContainer.remove(); // 移除按钮
            this.buttonsContainer = null;
        }
    }
}
export default LcCropperScreenshot;