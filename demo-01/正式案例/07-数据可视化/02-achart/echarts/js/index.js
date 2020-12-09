// rem适配代码
(function () {
    window.onresize = function () {
        var w = window.innerWidth;
        if (w <= 1024) {
            w = 1024;
        }
        if (w >= 1920) {
            w = 1920;
        }
        // w / 15 ==> 为了得到基准值
        document.documentElement.style.fontSize = w / 80 + "px";
    }
    window.onresize();
})();

// 故障/异常设备监控
(function () {
    var $monitor = $(".monitor");
    var $links = $monitor.find(".tabs a");
    var $contents = $monitor.find(".content");
    var $marquee = $monitor.find(".marquee");

    // 给a注册click
    $links.click(function () {
        // 高亮处理
        $(this).addClass("active").siblings().removeClass("active");

        // 处理显示对应的content ==> 根据下标来对应
        var idx = $(this).index();
        // console.log(idx);
        // 问题: tabs 导航也跟着隐藏了
        // 解决方案:
        //  1. 给content容器使用div包裹下
        //  2. siblings() 传参来筛选出指定的兄弟
        // $contents.eq(idx).show().siblings().hide(); // error
        $contents.eq(idx).show().siblings(".content").hide();
    });


    // 动画效果
    //  思路:
    //   1. 需要克隆列表放到后面去
    //   2. 将列表滚动到自身高的一半

    // 需要克隆列表放到后面去
    $marquee.each(function (index, item) {
        // console.log(index, item);
        $(item).children().clone().appendTo($(item));
    });
})();


// 饼图-点位分布
(function () {
    // 1. 得到echarts的实例对象
    //  init 参数是DOM对象
    var myCharts = echarts.init($(".point .pie")[0]);

    // 2. 配置项
    var option = {
        // 提示框
        tooltip: {
            trigger: 'item',
            // 决定提示框的内容
            formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        series: [{
            name: '面积模式',
            type: 'pie',
            color: ['#006cff', '#60cda0', '#ed8884', '#ff9f7f', '#0096ff', '#9fe6b8', '#32c5e9', '#1d9dff'],
            label: {
                // 字体大小
                fontSize: 10
            },
            labelLine: {
                // show: false
                // 连接扇区
                length: 8,
                // 连接文字
                length2: 10
            },
            radius: [10, 80],
            center: ['50%', '50%'],
            roseType: 'area',
            data: [{
                    value: 20,
                    name: '云南'
                },
                {
                    value: 26,
                    name: '北京'
                },
                {
                    value: 24,
                    name: '山东'
                },
                {
                    value: 25,
                    name: '河北'
                },
                {
                    value: 20,
                    name: '江苏'
                },
                {
                    value: 25,
                    name: '浙江'
                },
                {
                    value: 30,
                    name: '四川'
                },
                {
                    value: 42,
                    name: '湖北'
                }
            ]
        }]
    };

    // 3. setOption();
    myCharts.setOption(option);
})();


// 柱图
(function () {
    // 1. 
    var myCharts = echarts.init($(".users .bar")[0]);

    // 2. 
    var option = {
        color: ['#3398DB'],
        tooltip: {
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
                type: 'line' // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        grid: {
            top: "3%",
            right: '3%',
            bottom: '3%',
            left: '0',
            show: true,
            // 边框颜色
            borderColor: "rgba(0, 240, 255, 0.3)",
            // 是否包含刻度文本
            containLabel: true
        },
        xAxis: [{
            type: 'category',
            data: [
                "上海",
                "广州",
                "北京",
                "深圳",
                "合肥",
                "",
                "......",
                "",
                "杭州",
                "厦门",
                "济南",
                "成都",
                "重庆",
            ],
            axisTick: {
                // 实现隐藏刻度
                show: false,
                alignWithLabel: true
            },
            axisLabel: {
                color: "#4c9bfd"
            }
        }],
        yAxis: [{
            type: 'value',
            axisTick: {
                // 实现隐藏刻度
                show: false,
                alignWithLabel: true
            },
            axisLabel: {
                color: "#4c9bfd"
            },
            // y轴分割线
            splitLine: {
                lineStyle: {
                    color: "rgba(0, 240, 255, 0.3)"
                    // color: ["red", "lime"]
                }
            }
        }],
        series: [{
            name: '直接访问',
            type: 'bar',
            barWidth: '60%',
            data: [2100, 1900, 1700, 1560, 1400, 1200, 1200, 1200, 900, 750, 600, 480, 240],
            color: {
                type: 'linear',
                // 0, 0, 0, 1 意思是颜色从上到下渲染
                // 0，1，0，0 从下到上渲染
                // 0，0，1，0 颜色横向从左到右渲染
                // 1，0，0，0 颜色横向横向从右到左渲染
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                    // #00fffb 渐变到 #0061ce
                    offset: 0,
                    color: '#00fffb' // 0% 处的颜色
                }, {
                    offset: 1,
                    color: '#0061ce' // 100% 处的颜色
                }],
                global: false // 缺省为 false
            }
        }]
    };

    // 3. 
    myCharts.setOption(option);
})()