require('normalize.css/normalize.css');
require('styles/App.scss');

import React from 'react';

//载入文件配置信息
var imageDatas = require('../data/imagesData.json');


/**
 *功能：自执行函数，从配置文件中动态拼接文件完整路径
 *param:imagesArrar(Array)文件的配置信息（不包含文件的路径）
 *result:拼接后的完整的图片信息
 */
imageDatas = (function(imagesArrar) {
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
class imageFigure extends React.Component {
    render() {
        return ( < figure >
            < img src = { this.props.data.imgUrl }
            alt = { this.props.data.title }
            / > < figCaption > < h2 >{this.props.data.title} < /h2 > < /figCaption > < /figure >

        );
    }
};

class AppComponent extends React.Component {
    render() {
        //存储图片和控件集合
        var imageSecList = [],
            controlList = [];

        imageDatas.foreach(function(value) {
            imageSecList.push( < imageFigure data = {value }/ > )
        });

        return ( < section className = "stage" >
            < section className = "img_sec" > { imageDatas } < /section> < nav className = 'controller_nav' > < /nav > < /section>
        );
    }
}

AppComponent.defaultProps = {};

export default AppComponent;
