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
    };
    render() {
        return ( < figure className="img-figure" >
            < img src = { this.props.data.imgUrl } alt = { this.props.data.title }/ >  
             < figcaption > 
             < h2 className="img-title" > { this.props.data.title } < /h2 >
             < /figcaption >
              < /figure >
        )
    }
}

class AppComponent extends React.Component {
        constructor(props) {
            super(props);
        }
        render() {
                //存储图片和控件集合
                var imageSecList = [];
                var controlList = [];

                imageDatas.forEach((value, index) => {
                        imageSecList.push( < ImageFigure data = { value }
                            key = { index }
                            />);
                        });

                    return ( < section className = "stage" >
                        < section className = "img_sec" > { imageSecList } < /section > < nav className = "controller_nav" > { controlList } < /nav > < /section> )
                    }
                }


                AppComponent.defaultProps = {};
                export default AppComponent;
