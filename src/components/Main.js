require('normalize.css/normalize.css');
require('styles/App.scss');

import React from 'react';
import ReactDom from 'react-dom';

//载入文件配置信息
var imageDatas = require('../data/imagesData.json');


/**
 *功能：自执行函数，从配置文件中动态拼接文件完整路径
 *param:imagesArrar(Array)文件的配置信息（不包含文件的路径）
 *result:拼接后的完整的图片信息
 */
imageDatas = ((imagesArrar) => {
    for (var i = imagesArrar.length - 1; i >= 0; i--) {
        var singleImage = imagesArrar[i];
        singleImage.imgUrl = require('../images/' + singleImage.fileName); //生成单个文件完整路径
        imagesArrar[i] = singleImage;
    }
    return imagesArrar

})(imageDatas);


/**
 *单个图像组件
 */
class ImageFigure extends React.Component {
    constructor(props) {
            super(props);
            this.handleClick = this.handleClick.bind(this);
        }
        /**
         *点击事件
         */
    handleClick(e) {

        e.stopPropgation;
        e.preventDefault;
        this.props.inverse();



    }

    render() {
        var styleObj = {};
        if (this.props.arrange.pos) {
            styleObj = this.props.arrange.pos;
        }

        if (this.props.arrange.rotate) {
            (['ms', 'mos', 'Webkit', '']).forEach((value) => {
                styleObj[value + 'Transform'] = 'rotate(' + this.props.arrange.rotate + 'deg)';
            });
        }

        var imageFigureClassName = 'img-figure';
        imageFigureClassName += this.props.arrange.isInverse ? ' is-inverse' : '';

        return ( < figure className = { imageFigureClassName }
            onClick = { this.handleClick }
            style = { styleObj } >
            < img src = { this.props.data.imgUrl }
            alt = { this.props.data.title }
            / >   < figcaption > < h2 className = "img-title" > { this.props.data.title } < /h2 >
            < div className = "img-back"
            onClick = { this.handleClick } >
            < p > { this.props.data.desc } < /p> < /div > < /figcaption > < /figure >
        )
    }
}

/**
 *获取指定范围内的随机值
 *@parama low左侧范围 high右侧范围
 */
function GetArrayRandom(low, high) {
    return Math.ceil(Math.random() * (high - low) + low);
}
/*
 *获取0~30度之间的一个度数
 */
function Get30DegRandom() {
    return (Math.random() > 0.5 ? '' : '-') + Math.ceil(Math.random() * 30);
}
class AppComponent extends React.Component {
        //构造函数
        constructor(props) {
                super(props);
                //存放位置常量
                this.Constant = {
                    centerPos: //居中位置
                    {
                        left: 0,
                        top: 0
                    },
                    hPosRange: //水平方向
                    {
                        leftSecX: [0, 0],
                        rightSexX: [0, 0],
                        y: [0, 0]
                    },
                    vPosRange: //垂直方向的范围
                    {
                        x: [0, 0],
                        topY: [0, 0]
                    }


                };
                this.state = //存储图片位置信息
                    {
                        imagesArrayageArr: []
                    }
            }
            /**
             *闭包函数，返回被反转图片的位置信息
             *@parama index 被反转图片的索引
             */
        inverse(index) {
            return function() {
                var imagesArrayageArr = this.state.imagesArrayageArr;

                imagesArrayageArr[index].isInverse = !imagesArrayageArr[index].isInverse;

                this.setState({

                    imagesArrayageArr: imagesArrayageArr
                });
            }.bind(this);
        }

        /**
         *重新布局所有图片
         *@parama centerindex 指定居中排布哪个图片
         */
        Rearrange(centerindex) {

            let imagesArrayageArr = this.state.imagesArrayageArr,
                constant = this.Constant,
                centerPos = constant.centerPos,
                hPosRange = constant.hPosRange,
                vPosRange = constant.vPosRange,

                hPosRangeLeftSecX = hPosRange.leftSecX,
                hPosRangeRightSecX = hPosRange.rightSexX,
                hPosRangeY = hPosRange.y,
                vPosRangeTopY = vPosRange.topY,
                vPosRangeX = vPosRange.x,

                imagesArrayTopArr = [], //存放在上部图片的信息
                topNum = Math.floor(Math.random() * 2), //取一个或者零个图片
                imagesArrayTopIndex = 0, //顶部的图片开始的索引

                imagesArrayCenterArr = imagesArrayageArr.splice(centerindex, 1); //得到中心图片的信息

            imagesArrayCenterArr[0] = { pos: centerPos, rotate: 0 }; //中间图片的信息


            //放在上部的图片信息
            imagesArrayTopIndex = Math.ceil(Math.random() * (imagesArrayageArr.length - topNum));
            imagesArrayTopArr = imagesArrayageArr.splice(imagesArrayTopIndex, topNum);

            imagesArrayTopArr.forEach((value, index) => {
                imagesArrayTopArr[index] = {
                    pos: {
                        top: GetArrayRandom(vPosRangeTopY[0],
                            vPosRangeTopY[1]),
                        left: GetArrayRandom(vPosRangeX[0], vPosRangeX[1])
                    },
                    rotate: Get30DegRandom()
                }
            });

            //处理放在左右两侧的图片信息
            for (let i = 0, j = imagesArrayageArr.length, k = j / 2; i < j; i++) {
                let hPosRangeLOR = null;
                if (i < k) {
                    hPosRangeLOR = hPosRangeLeftSecX;
                } else {
                    hPosRangeLOR = hPosRangeRightSecX;
                }
                imagesArrayageArr[i] = {
                    pos: {
                        left: GetArrayRandom(hPosRangeLOR[0], hPosRangeLOR[1]),
                        top: GetArrayRandom(hPosRangeY[0], hPosRangeY[1])
                    },
                    rotate: Get30DegRandom()
                }

            }

            //将剔除出来的图片重新填回去
            if (imagesArrayTopArr && imagesArrayTopArr[0]) {
                imagesArrayageArr.splice(imagesArrayTopIndex, 0, imagesArrayTopArr[0]);
            }

            imagesArrayageArr.splice(centerindex, 0, imagesArrayCenterArr[0]);

            this.setState({
                imagesArrayageArr: imagesArrayageArr

            });



        }

        //钩子函数，图片加载完成后，为每张图片安排位置
        componentDidMount() {
            //获取舞台大小
            let stage = ReactDom.findDOMNode(this.refs.stage),
                stageW = stage.scrollWidth,
                stageH = stage.scrollHeight,
                halfStageH = Math.ceil(stageH / 2),
                halfStageW = Math.ceil(stageW / 2);

            //获取imagefigure的大小
            let imageFigureDom = ReactDom.findDOMNode(this.refs.imageFigure0),
                figureW = imageFigureDom.scrollWidth,
                figureH = imageFigureDom.scrollHeight,
                halfFigureW = Math.ceil(figureW / 2),
                halfFigureH = Math.ceil(figureH / 2);


            //计算中心点的位置
            this.Constant.centerPos.left = halfStageW - halfFigureW;
            this.Constant.centerPos.top = halfStageH - halfFigureH

            //计算左边、右边图片的排布位置
            this.Constant.hPosRange.leftSecX[0] = -halfFigureW;
            this.Constant.hPosRange.leftSecX[1] = halfStageW - halfFigureW * 3;
            this.Constant.hPosRange.rightSexX[0] = halfStageW + halfFigureW;
            this.Constant.hPosRange.rightSexX[1] = stageW - halfFigureW;
            this.Constant.hPosRange.y[0] = -halfFigureH;
            this.Constant.hPosRange.y[1] = stageH - halfFigureH;

            //计算中间上部的图片排布范围
            this.Constant.vPosRange.x[0] = halfStageW - figureW;
            this.Constant.vPosRange.x[1] = halfStageW + figureW;
            this.Constant.vPosRange.topY[0] = -halfFigureH;
            this.Constant.vPosRange.topY[1] = halfStageH - halfFigureH * 3;

            this.Rearrange(0);
        }

        render() {
                //存储图片和控件集合
                var imageSecList = [];
                var controlList = [];

                imageDatas.forEach((value, index) => {
                        if (!this.state.imagesArrayageArr[index]) {
                            this.state.imagesArrayageArr[index] = {
                                pos: {
                                    left: 0,
                                    top: 0
                                },
                                rotate: 0, //选择属性
                                isInverse: false //是否反转
                            }
                        }
                        imageSecList.push( < ImageFigure data = { value }
                            key = { index }
                            ref = { 'imageFigure' + index }
                            arrange = { this.state.imagesArrayageArr[index] }
                            inverse = { this.inverse(index) }
                            />);
                        });

                    return ( < section className = "stage"
                        ref = "stage" >
                        < section className = "img_sec" > { imageSecList } < /section > < nav className = "controller_nav" > { controlList } < /nav > < /section> )
                    }
                }


                AppComponent.defaultProps = {};
                export default AppComponent;
