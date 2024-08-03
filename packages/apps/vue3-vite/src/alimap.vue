<template>
    <div class="fl fl_ai_c fl_jc_sb amap_dialog_header">
        <div class="fl fl_ai_b">
            <h3 style="margin: unset">设置项目地址</h3>
            <span class="sub_title">鼠标右击，设置项目地址</span>
        </div>
    </div>
    <div class="map_body">
        <div class="fl fl_jc_sb fl_ai_c map_tools">
            <div class="fl map_search">
                <div class="map_search_key">
                    <input v-model="search_key" type="text" class="map_search_key_input" placeholder="搜索地点"
                        @input="onInput" @keyup.enter="searchSuggest" @keyup.escape.stop="clearSearch" />
                    <img v-show="search_key" @click="clearSearch" class="map_search_key_clear"
                        src="/assets/amap_search_clear.svg" />
                </div>
                <div class="map_search_btn fl_center">
                    <img src="/assets/amap_search.svg" @click="searchSuggest" />
                </div>
                <div class="suggest_result" v-show="suggest_result.length">
                    <div class="suggest_result_list">
                        <div class="suggest_result_item fl fl_ai_s" v-for="item in suggest_result" :key="item.id"
                            @click="poiSearch(item)">
                            <img src="/assets/amap_search_locate.svg" class="map_search_locate" />
                            <span class="sug_val"><strong>{{ search_key }}</strong>{{ item.name.replace(search_key, "")
                                }}</span>
                            <span class="district">{{ item.pname }}{{ item.cityname }}{{ adname }}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="fl">
                <div class="fl" v-show="state.currentLayer === 'satellite'">
                    <div style="position: relative">
                        <el-button class="mgR10" @click="openRemoveRoadNetDialog">
                            <div class="fl fl_ai_c">
                                <img src="/assets/amap_action_screenshot.svg" /> <span class="mgL5">截图</span>
                            </div>
                        </el-button>

                        <div v-if="state.screenshotVisible" class="alimap_tooltip">
                            点击截取航拍图；<el-button link style="color: rgba(255, 228, 26, 1); font-size: 12px"
                                @click="setTipVisible('screenshotVisible')">知道了</el-button>
                            <span class="arrow"></span>
                        </div>
                    </div>

                    <div class="like_btn_box fl_center mgR10" v-show="state.currentLayer === 'satellite'">
                        <el-checkbox v-model="state.roadNet" @change="showRoadNetLayer">路网</el-checkbox>
                    </div>
                </div>
                <div style="position: relative">
                    <el-button-group>
                        <el-button :type="state.currentLayer === 'satellite' ? 'primary' : 'default'"
                            @click="changeLayerTo('satellite')">
                            <div class="fl fl_ai_fe">
                                <img v-show="state.currentLayer === '2D'" src="/assets/amap_layer_satellite.svg" />
                                <img v-show="state.currentLayer === 'satellite'"
                                    src="/assets/amap_layer_satellite_active.svg" />
                                <span class="mgL5">卫星地图</span>
                            </div>
                        </el-button>
                        <el-button :type="state.currentLayer === '2D' ? 'primary' : 'default'"
                            @click="changeLayerTo('2D')">
                            <div class="fl fl_ai_fe">
                                <img v-show="state.currentLayer === 'satellite'" src="/assets/amap_layer_2d.svg" />
                                <img v-show="state.currentLayer === '2D'" src="/assets/amap_layer_2d_active.svg" />
                                <span class="mgL5">2D地图</span>
                            </div>
                        </el-button>
                    </el-button-group>
                    <div v-if="state.satelliteLayerVisible" class="alimap_tooltip" style="width: 205px; left: 25%">
                        点击卫星地图截取航拍图；<el-button link style="color: rgba(255, 228, 26, 1); font-size: 12px"
                            @click="setTipVisible('satelliteLayerVisible')">知道了</el-button>
                        <span class="arrow"></span>
                    </div>
                </div>
            </div>
        </div>
        <div id="aMapContainer" class="map_container"></div>
        <div id="aMapScreenshotOverlop" class="map_screenshot_overlop">
            <img id="mapToImage" />
        </div>
    </div>
</template>

<script setup>
import _debounce from "lodash/debounce";
import AMapLoader from "@amap/amap-jsapi-loader";
import { onMounted, onUnmounted, ref, nextTick, reactive, toRaw } from "vue";
import { ElMessageBox, ElMessage, ElButtonGroup, ElButton } from "element-plus";
import { Right } from "@element-plus/icons-vue";
import LcCropperScreenshot from "@/components/lc-cropper-screenshot";

const state = reactive({
    onlyScreenshot: false,
    currentLayer: "2D",
    roadNet: false,
    screenShot: null,
    openNoAddress: false,
    openRemoveRoadNet: false,
    openScreenshotUsed: false,
    screenshotVisible: localStorage.getItem("_alimap_screenshot_btn_tip_visible_") === "1" ? false : true,
    satelliteLayerVisible: localStorage.getItem("_alimap_satellite_btn_btn_tip_visible_") === "1" ? false : true
});

const search_key = ref("");
const suggest_result = ref([]);

let map = null;
let placeSearch = null;
let emitCallback = null;
let scalePlugin = null;
let controlBarPlugin = null;
let marker = null;
let searchMarker = null;
// 图层 卫星图和2D图
let normalLayer = null;
let satelliteLayer = null;
let roadNetLayer = null;

let croppedImageData = null;

let selectedPoi = null;

// 搜索关联查询
const searchSuggest = () => {
    placeSearch.search(search_key.value, (status, result) => {
        //搜索成功时，result 即是对应的匹配数据
        if (status === "complete" && result.info === "OK") {
            suggest_result.value = result?.poiList?.pois;
        }
    });
};

const debouncedSearch = _debounce(searchSuggest, 300);

const onInput = () => {
    debouncedSearch();
};

// 搜索具体位置信息
const poiSearch = poi => {
    if (!poi) return;
    if (poi && poi.location) {
        map.setCenter(poi.location);
        map.setZoom(16);
        addSearchMarker(poi.location);
    }
    search_key.value = poi.name;
    suggest_result.value = [];
};

// 清空搜索框搜索
const clearSearch = () => {
    search_key.value = "";
    suggest_result.value = [];
};

// 通过点坐标，获取地址
async function setProjectAddress(poi) {
    const geocoder = new AMap.Geocoder({
        city: "全国" // city 指定进行编码查询的城市，支持传入城市名、adcode 和 citycode
    });

    const lnglat = [poi.lng, poi.lat];
    await geocoder.getAddress(lnglat, (status, result) => {
        if (status === "complete" && result.regeocode) {
            selectedPoi.address = result?.regeocode?.formattedAddress;
            addMarker(selectedPoi);
        } else {
            console.error("根据经纬度查询地址失败");
        }
    });
}

// 按钮提示框的关闭 -- 知道了，按钮
function setTipVisible(key) {
    state[key] = false;
    if (key === "screenshotVisible") {
        localStorage.setItem("_alimap_screenshot_btn_tip_visible_", "1");
    }
    if (key === "satelliteLayerVisible") {
        localStorage.setItem("_alimap_satellite_btn_btn_tip_visible_", "1");
    }
}

// 初始化地图
function initMap() {
    AMapLoader.load({
        key: "c8122937306bd212fcf9fba1425d0f2c", // 申请好的Web端开发者Key，首次调用 load 时必填
        version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        plugins: [
            "AMap.AutoComplete",
            "AMap.PlaceSearch",
            "AMap.Geocoder",
            "AMap.Geolocation",
            "AMap.ContextMenu",
            "AMap.Scale",
            "AMap.ToolBar",
            "AMap.ControlBar",
            "AMap.MapType",
            "AMap.MapsEvent"
        ] // 需要使用的的插件列表，如比例尺'AMap.Scale'等
    })
        .then(AMap => {
            satelliteLayer = new AMap.TileLayer.Satellite();
            roadNetLayer = new AMap.TileLayer.RoadNet();
            normalLayer = new AMap.TileLayer();
            map = new AMap.Map("aMapContainer", {
                // 设置地图容器id
                viewMode: "2D", // 是否为3D地图模式
                zoom: 16, // 初始化地图级别
                layers: [
                    normalLayer // 卫星图层
                ],
                //加上这串代码
                WebGLParams: {
                    preserveDrawingBuffer: true
                }
            });

            placeSearch = new AMap.PlaceSearch({
                //city 指定搜索所在城市，支持传入格式有：城市名、citycode 和 adcode
                city: "全国",
                extensions: "complete"
            });

            scalePlugin = new AMap.Scale({
                position: {
                    bottom: "18px",
                    right: "100px"
                }
            });
            controlBarPlugin = new AMap.ControlBar({
                position: {
                    bottom: "90px",
                    right: "10px"
                }
            });

            map.addControl(scalePlugin);
            map.addControl(controlBarPlugin);
            map.addControl(
                new AMap.ToolBar({
                    position: {
                        bottom: "10px",
                        right: "40px"
                    }
                })
            );

            // 绑定右键菜单到地图
            map.on("rightclick", function (e) {
                addContextMenu(e);
            });

            initialLocation();
        })
        .catch(e => {
            console.log(e);
        });
}
const clickHandler = event => {
    removeContextMenu();
};

const keydownHandler = event => {
    if (event.key === "Escape") {
        removeContextMenu();
    }
};

function addContextMenu(e) {
    const mapContainer = document.getElementById("aMapContainer");
    const mapContainerBound = mapContainer.getBoundingClientRect();
    let contextMenu = `<div id="js_alimap_right_click_menu" class="alimap_right_click_menu">
            <div id="js_alimap_right_click_menu_set_position" class="alimap_right_click_menu_item border_radius_top fl fl_ai_c">
                <img src="/assets/amap_location.svg" class="alimap_menu_icon"/>
                <span class="alimap_menu_text">设置为项目地址</span>
            </div>
            <div id="js_alimap_right_click_menu_screenshot" class="alimap_right_click_menu_item border_radius_top fl fl_ai_c">
                <img src="/assets/amap_action_screenshot.svg" class="alimap_menu_icon"/>
                <span class="alimap_menu_text">截取航拍图</span>
            </div>
        </div>`;

    document.body.insertAdjacentHTML("beforeend", contextMenu);
    const menu = document.getElementById("js_alimap_right_click_menu");
    menu.style.display = "block";
    menu.style.left = mapContainerBound.x + e.pixel.x + "px";
    menu.style.top = mapContainerBound.y + e.pixel.y + "px";

    const lnglat = e.lnglat;

    const click_menu_set_position = document.getElementById("js_alimap_right_click_menu_set_position");
    if (click_menu_set_position) {
        click_menu_set_position.addEventListener("click", function (event) {
            event.preventDefault(); // 防止表单实际提交
            removeContextMenu();
            selectedPoi = { longitude: lnglat.lng, latitude: lnglat.lat };
            setProjectAddress(lnglat);
        });
    }

    const click_menu_screenshot = document.getElementById("js_alimap_right_click_menu_screenshot");
    if (click_menu_screenshot) {
        click_menu_screenshot.addEventListener("click", function (event) {
            event.preventDefault(); // 防止表单实际提交
            removeContextMenu();
            if (state.currentLayer === "2D") {
                changeLayerTo("satellite");
            } else if (state.currentLayer === "satellite") {
                if (state.roadNet) {
                    state.roadNet = false;
                    showRoadNetLayer();
                }
                setTimeout(() => startScreenshot(), 100);
            }
        });
    }

    // 点击document或按下Esc键时删除右键菜单
    document.addEventListener("click", clickHandler);

    document.addEventListener("keydown", keydownHandler);
}

function removeContextMenu() {
    const menu = document.getElementById("js_alimap_right_click_menu");
    if (menu) {
        menu.remove();
    }
    document.removeEventListener("click", clickHandler);
    document.removeEventListener("keydown", keydownHandler);
}

// 点击地图，添加marker点
function addMarker(poi) {
    if (searchMarker) {
        map.remove(searchMarker);
        searchMarker = null;
    }
    if (marker) {
        map.remove(marker);
        marker = null;
    }

    const content = `<img src="/assets/amap_location.svg" class="alimap_marker_icon">`;
    const position = new AMap.LngLat(poi.longitude, poi.latitude);

    // 将 icon 传入 marker
    marker = new AMap.Marker({
        content,
        position,
        offset: new AMap.Pixel(-20, -36)
    });

    map.add(marker);

    // 为marker添加右键点击事件
    marker.on("rightclick", event => {
        // 手动触发地图的右键点击事件
        map.emit("rightclick", {
            lnglat: event.lnglat,
            pixel: event.pixel,
            target: map
        });
    });
}

function addSearchMarker(poi) {
    if (searchMarker) {
        map.remove(searchMarker);
        searchMarker = null;
    }

    const content = `<img src="/assets/amap_search_location.svg" class="alimap_marker_icon">`;
    const position = new AMap.LngLat(poi.lng, poi.lat);

    // 将 icon 传入 marker
    searchMarker = new AMap.Marker({
        content,
        position,
        offset: new AMap.Pixel(-20, -36)
    });

    map.add(searchMarker);

    // 为marker添加右键点击事件
    searchMarker.on("rightclick", event => {
        // 手动触发地图的右键点击事件
        map.emit("rightclick", {
            lnglat: event.lnglat,
            pixel: event.pixel,
            target: map
        });
    });
}

// 切换地图 卫星图 和 2D图切换
function changeLayerTo(layer) {
    state.currentLayer = layer;
    if (map) {
        map.remove([normalLayer, satelliteLayer, roadNetLayer]);
        if (layer === "satellite") {
            map.setLayers([satelliteLayer]);
        }
        if (layer === "2D") {
            map.setLayers([normalLayer]);
        }
    }
}

// 切换路网，是否展示路网
function showRoadNetLayer() {
    if (map && state.currentLayer === "satellite") {
        map.remove([normalLayer, satelliteLayer, roadNetLayer]);
        if (state.roadNet) {
            map.setLayers([satelliteLayer, roadNetLayer]);
        } else {
            map.setLayers([satelliteLayer]);
        }
    }
}

// 截图按钮，如果发现展示路网，提示用户取消路网截图更方便
function openRemoveRoadNetDialog() {
    if (state.currentLayer === "satellite") {
        if (state.roadNet) {
            state.openRemoveRoadNet = true;
        } else {
            startScreenshot();
        }
    }
}


// 开始截图
function startScreenshot() {
    const aMapContainer = document.querySelector("#aMapContainer");
    const screenshotContainer = document.querySelector("#aMapScreenshotOverlop");
    const mapCanvas = document.querySelector("#aMapContainer .amap-layer");
    if (map) {
        const size = aMapContainer.getBoundingClientRect();
        let imgData = mapCanvas.toDataURL("png");
        const cropperImage = document.getElementById("mapToImage");
        cropperImage.src = imgData;
        cropperImage.width = size.width;
        cropperImage.height = size.height;
        screenshotContainer.style.display = "block";
        let cropper = null;
        cropperImage.onload = function () {
            aMapContainer.style.display = "none";
            cropper = new LcCropperScreenshot(cropperImage, {
                onCropperEnd: croppedData => {
                    croppedImageData = croppedData;
                    screenshotContainer.style.display = "none";
                    aMapContainer.style.display = "block";
                    state.openScreenshotUsed = true;
                },
                onCropperCancel: () => {
                    screenshotContainer.style.display = "none";
                    aMapContainer.style.display = "block";
                }
            });
        };

        const keydownScreenshotHandler = () => {
            if (cropper) {
                cropper.cancelCrop();
            }
            document.removeEventListener("keydown", keydownScreenshotHandler);
        };
        document.addEventListener("keydown", keydownScreenshotHandler);
    }
}

// 关闭截图
function initialLocation() {
    const locate = selectedPoi;
    if (map && locate && locate.longitude && locate.latitude) {
        map.setZoomAndCenter(16, [locate.longitude, locate.latitude]);
        addMarker(locate);
    }
}
// 监听窗口大小变化
onMounted(() => {
    if (!localStorage.getItem("notice_select_on_map")) {
        ElMessageBox.confirm("鼠标右击地图，设置项目地址 或者 截卫星图！", "温馨提示", {
            confirmButtonText: "知道了",
            cancelButtonText: "不再提示",
            cancelButtonClass: "alimap_btn_cancel",
            type: "success",
            "append-to": "aMapDialog"
        }).catch(() => {
            localStorage.setItem("notice_select_on_map", "1");
        });
    }
    nextTick(() => {
        initMap();
    });
});
</script>

<style scoped>
.amap_dialog_header {
    margin: 16px;
}

.sub_title {
    font-size: 12px;
    font-weight: 400;
    color: rgba(0, 87, 255, 1);
    margin-left: 8px;
}

.map_body {
    width: 100%;
    height: calc(100vh - 60px);
    position: relative;
}

.map_container {
    width: 100%;
    height: 100%;
}

.map_tools {
    position: absolute;
    top: 15px;
    width: 100%;
    height: 38px;
    padding: 0 15px;
    z-index: 11;
    background: transparent;
    box-sizing: border-box;
}

.map_search {
    box-shadow: 1px 2px 1px rgba(0, 0, 0, 0.15);
}

.map_search_key {
    position: relative;
    width: 368px;
    height: 36px;
    background: #fff;
}

.map_search_key_input {
    width: 100%;
    height: 100%;
    text-indent: 5px;
    border: none !important;
    margin-right: 24px;
}

.map_search_key_input:focus {
    outline: none !important;
}

.map_search_key_clear {
    position: absolute;
    right: 5px;
    top: 50%;
    transform: translateY(-50%);
    width: 18px;
    height: 18px;
    cursor: pointer;
}

.map_search_btn {
    width: 57px;
    height: 38px;
    border-radius: 0 2px 2px 0;
    background-color: #3385ff;
    cursor: pointer;
}

.suggest_result {
    position: absolute;
    width: 368px;
    height: 330px;
    background: #fff;
    border-radius: 0 0 2px 2px;
    box-shadow: 1px 2px 1px rgba(0, 0, 0, 0.15);
    border-top: 1px solid rgba(223, 228, 235, 1);
    top: 38px;
    overflow-y: auto;
}

.map_search_locate {
    margin-right: 3px;
}

.suggest_result_item {
    padding: 0 10px;
    cursor: pointer;
    overflow: hidden;
    white-space: nowrap;
    line-height: 32px;
}

.suggest_result_item:hover {
    background-color: #eee;
}

.sug_val {
    font-size: 13px;
    font-weight: 400;
    color: #404040;
}

.sug_val strong {
    color: #0082e5;
}

.district {
    margin-left: 10px;
    margin-right: 5px;
    color: #999;
    font-size: 12px;
}

.alimap_btn_cancel {
    margin-right: 20px;
}

.alert_bg {
    opacity: 0.6;
    border-radius: 10px;
    background: linear-gradient(90deg, rgba(235, 236, 255, 1) 0%, rgba(227, 249, 255, 1) 100%);
    padding: 31px 0 18px;
}

.alert_image {
    width: 40px;
    height: 31px;
}

.alert_message {
    width: 195px;
    line-height: 23px;
    font-size: 16px;
    font-weight: 400;
    color: rgba(0, 0, 0, 1);
    margin-top: 12px;
    text-align: center;
}

.alert_footer {
    margin-top: 32px;
}

.map_screenshot_overlop {
    display: none;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 99;
}

.alimap_tooltip {
    position: absolute;
    top: 40px;
    left: 50%;
    background: rgba(54, 54, 54, 1);
    color: #fff;
    transform: translateX(-50%);
    border-radius: 6px;
    min-width: 155px;
    height: 32px;
    line-height: 32px;
    box-sizing: border-box;
    text-align: center;
    font-size: 12px;
}

.alimap_tooltip>span.arrow {
    width: 12px;
    height: 12px;
    position: absolute;
    top: -5px;
    left: 50%;
    transform: rotate(45deg);
    background: rgba(54, 54, 54, 1);
    z-index: 9;
}
</style>

<style>
#root {
    overflow: hidden;
    height: 100%;
}

.alimap_marker_icon {
    width: 40px;
    height: 40px;
}

.amap_alert_dialog {
    padding: 0;
}

.amap_alert_dialog .el-dialog__header {
    padding: 0;
}

.amap_alert_dialog .el-dialog__headerbtn {
    z-index: 9;
}

.amap_dialog .amap-logo,
.amap_dialog .amap-copyright {
    display: none !important;
}

.alimap_right_click_menu {
    border-radius: 6px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
    position: absolute;
    z-index: 999999999999;
    background: #fff;
}

.alimap_right_click_menu_item {
    width: 140px;
    height: 32px;
    cursor: pointer;
    padding: 12px 8px;
    box-sizing: border-box;
}

.alimap_right_click_menu_item.border_bottom {
    border-bottom: 1px solid rgba(240, 240, 240, 1);
}

.alimap_right_click_menu_item:hover {
    background: rgba(240, 240, 240, 1);
}

.border_radius {
    border-radius: 6px;
}

.border_radius_top {
    border-radius: 6px 6px 0 0;
}

.border_radius_bottom {
    border-radius: 0 0 6px 6px;
}

.alimap_menu_icon {
    width: 20px;
    height: 20px;
}

.alimap_menu_text {
    font-size: 12px;
    font-weight: 400;
    color: rgba(117, 117, 117, 1);
    margin-left: 6px;
}
</style>
