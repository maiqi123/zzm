// 故障/异常设备监控
(function() {
    var $monitor = $(".monitor");
    var $links = $monitor.find(".tabs a");
    var $contents = $monitor.find(".content");
    var $marquee = $monitor.find(".marquee");

    // 给a注册click
    $links.click(function() {
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
    $marquee.each(function(index, item) {
        // console.log(index, item);
        $(item).children().clone().appendTo($(item));
    });
})();

// 饼图-点位分布
(function() {
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
            data: [
                { value: 20, name: '云南' },
                { value: 26, name: '北京' },
                { value: 24, name: '山东' },
                { value: 25, name: '河北' },
                { value: 20, name: '江苏' },
                { value: 25, name: '浙江' },
                { value: 30, name: '四川' },
                { value: 42, name: '湖北' }
            ]
        }]
    };

    // 3. setOption();
    myCharts.setOption(option);

    window.addEventListener("resize", function () {
        // 饼图的大小调整下
        myCharts.resize();
    })
})();

// 柱图
(function() {
    // 1. 
    var myCharts = echarts.init($(".users .bar")[0]);

    // 中间三根1200的柱子的配置
    var itemOption = {
        value: 1200, // 单个数据项的数值。
        itemStyle: {
            // 柱子的颜色
            color: "#254065"
        },
        emphasis: {
            // 鼠标移入高亮颜色
            itemStyle: {
                color: "#254065"
            }
        },
        // 不显示提示框
        tooltip: {
            // padding: 20,
            // backgroundColor: "lime"
            // 添加额外样式
            // extraCssText: "display: none", // error
            // extraCssText: "opacity: 0", // ok
            show: false, // 不显示提示框
        }
    };

    // 2. 
    var option = {
        color: ['#3398DB'],
        tooltip: {
            trigger: 'item',
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
            data: [2100, 1900, 1700, 1560, 1400, itemOption, itemOption, itemOption, 900, 750, 600, 480, 240],
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
                    color: '#00fffb'
                    // 0% 处的颜色
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

    window.addEventListener("resize", function () {
        // 柱图的大小调整下
        myCharts.resize();
    })
})();

// 订单量 && 销售额
(function() {
    var $order = $(".order");
    var $links = $order.find(".filter a");
    var $h4s = $order.find(".data h4");

    // 准备好的假数据
    var data = [
        // orders 订单量
        // amount 销售额
        { orders: "20,301,987", amount: "99834" },
        { orders: "301,987", amount: "9834" },
        { orders: "1,987", amount: "3834" },
        { orders: "987", amount: "834" },
    ];

    // 给a注册click
    $links.click(function() {
        // 高亮变化 active
        $(this).addClass("active").siblings().removeClass("active");

        // 点击导航
        // 1. 获取到当前的下标
        // 2. 用下标找到对应的数据(对象)
        // 3. 把数据的值放到页面中展示
        var idx = $(this).index();
        // console.log(idx, data[idx]);

        // 订单量
        $h4s.eq(0).text(data[idx].orders);
        // 销售额
        $h4s.eq(1).text(data[idx].amount);
    });

    // 开定时器
    var count = 0; // 表示当前的下标
    setInterval(function() {
        /*count++;
        if(count >= 4){
            count = 0;
        }*/

        // 换种写法
        count = ++count % $links.length;
        // console.log(count); // 0 1 2 3

        // 触发对应下标的a链接的点击事件
        $links.eq(count).click();
    }, 1000)
})();


// 折线图
(function() {
    var myCharts = echarts.init($(".sales .line")[0]);

    var option = {
        grid: {
            top: '20%',
            left: '3%',
            right: '4%',
            bottom: '3%',
            show: true, // 显示边框
            borderColor: '#012f4a', // 边框颜色
            containLabel: true // 包含刻度文字在内
        },
        xAxis: {
            type: 'category',
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
            axisTick: {
                // 隐藏刻度线
                show: false,
            },
            axisLine: {
                // 隐藏轴线
                show: false
            },
            axisLabel: {
                // 刻度文字颜色
                color: "#4c9bfd"
            },
            // 两边不留白
            boundaryGap: false
        },
        yAxis: {
            type: 'value',
            axisTick: {
                // 隐藏刻度线
                show: false,
            },
            axisLabel: {
                // 刻度文字颜色
                color: "#4c9bfd"
            },
            splitLine: {
                // y轴分割线
                lineStyle: {
                    color: '#012f4a' // 分割线颜色
                }
            }
        },
        // 图例
        legend: {
            right: "10%",
            textStyle: {
                // 图例文字颜色
                color: "#4c9bfd"
            }
        },
        // 提示框
        tooltip: {
            trigger: "axis",
        },
        series: [{
            name: "预期销售额",
            data: [24, 40, 101, 134, 90, 230, 210, 230, 120, 230, 210, 120],
            type: 'line',
            smooth: true,
            itemStyle: {
                color: "#00f2f1"
            }
        }, {
            name: "实际销售额",
            data: [40, 64, 191, 324, 290, 330, 310, 213, 180, 200, 180, 79],
            type: 'line',
            smooth: true,
            itemStyle: {
                color: "#ed3f35"
            }
        }]
    };

    myCharts.setOption(option);

    window.addEventListener("resize", function () {
        // 饼图的大小调整下
        myCharts.resize();
    })

    // 实现点击切换功能
    var $sales = $(".sales");
    var $links = $sales.find(".caption a");

    // 假数据
    var data = {
        // 年份的数据
        year: [
            // 预期销售额
            [24, 40, 101, 134, 90, 230, 210, 230, 120, 230, 210, 120],
            // 实际销售额
            [40, 64, 191, 324, 290, 330, 310, 213, 180, 200, 180, 79],
        ],
        quarter: [
            [23, 75, 12, 97, 21, 67, 98, 21, 43, 64, 76, 38],
            [43, 31, 65, 23, 78, 21, 82, 64, 43, 60, 19, 34],
        ],
        month: [
            [34, 87, 32, 76, 98, 12, 32, 87, 39, 36, 29, 36],
            [56, 43, 98, 21, 56, 87, 43, 12, 43, 54, 12, 98],
        ],
        week: [
            [43, 73, 62, 54, 91, 54, 84, 43, 86, 43, 54, 53],
            [32, 54, 34, 87, 32, 45, 62, 68, 93, 54, 54, 24],
        ],
    };

    // 导航点击功能
    $links.click(function() {
        // 高亮切换
        $(this).addClass("active").siblings().removeClass("active");

        // 点击a链接, 需要让折线图发生改变 
        //      ==> option的series的两条线
        //          (预期销售额和实际销售额)的data数据, 
        //      ==> 修改之后, 把setOption在调用一次
        //          ( 需要让折线图按照最新, 修改后的option来重新渲染下折线图 )

        // 点击要改变折线图步骤:
        // 1. 获取到当前点击的a链接上 data-type属性值
        // 2. 根据属性值, 可以去data数据中获取到对应的数据
        // 3. 把获取到的对应的数据, 设置给series的两条线的data数据
        // 4. 把setOption在调用一次

        // 1.
        var key = $(this).attr("data-type"); // year ...
        // 2. 
        var itemData = data[key];
        // console.log(key, itemData);

        // 3.
        // 预期销售额
        option.series[0].data = itemData[0];
        // 实际销售额
        option.series[1].data = itemData[1];
        // console.log(option.series);

        // 4.
        myCharts.setOption(option);

        // 同步count
        // count = $(this).index(); // error 和结构相关
        count = $(this).index() - 1;
    });

    // 自动播放
    var count = 0;

    function fn() {
        count = ++count % $links.length;
        $links.eq(count).click();
    }
    var timerId = setInterval(fn, 3000);

    // 鼠标移入, 清除定时器
    $sales.mouseenter(function() {
        clearInterval(timerId);
    });

    // 鼠标移出,重新开定时器
    $sales.mouseleave(function() {
        timerId = setInterval(fn, 3000);
    })
})();


// 半个饼图
(function() {
    var myCharts = echarts.init($(".quarter .gauge")[0]);

    var option = {
        series: [{
            name: '访问来源',
            type: 'pie',
            radius: ['130%', '150%'],
            center: ["48%", "80%"],
            avoidLabelOverlap: false,
            label: {
                show: false,
                position: 'center'
            },
            emphasis: {
                label: {
                    show: false,
                    fontSize: '10',
                    fontWeight: 'bold'
                }
            },
            startAngle: 0,
            labelLine: {
                show: false
            },
            hoverOffset: 0,
            data: [{
                    value: 200,
                    name: '直接访问',
                    itemStyle: {
                        // 透明的半饼图
                        color: "transparent"
                    }
                },
                {
                    value: 100,
                    name: '邮件营销',
                    itemStyle: {
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
                                color: '#00c9e0'
                                // 0% 处的颜色
                            }, {
                                offset: 1,
                                color: '#005fc1' // 100% 处的颜色
                            }],
                            global: false // 缺省为 false
                        }
                    }
                },
                {
                    value: 100,
                    name: '联盟广告',
                    itemStyle: {
                        color: "#12274d"
                    }
                }
            ]
        }]
    };

    myCharts.setOption(option);
})();

// 热销
(function() {
    // 假数据
    var data = {
        beijing: [
            { name: "可爱多", num: "9,086" },
            { name: "娃哈哈", num: "8,341" },
            { name: "喜之郎", num: "7,407" },
            { name: "八喜", num: "6,080" },
            { name: "小洋人", num: "6,024" },
            { name: "好多鱼", num: "2,170" },
        ],
        hebei: [
            { name: "喜之郎", num: "7,407" },
            { name: "可爱多", num: "7,086" },
            { name: "好多鱼", num: "6,475" },
            { name: "小洋人", num: "6,121" },
            { name: "娃哈哈", num: "3,142" },
            { name: "八喜", num: "2,060" },
        ],
        shanghai: [
            { name: "娃哈哈", num: "6,941" },
            { name: "八喜", num: "9,980" },
            { name: "好多鱼", num: "9,175" },
            { name: "可爱多", num: "8,326" },
            { name: "喜之郎", num: "7,907" },
            { name: "小洋人", num: "7,796" },
        ],
        jiangsu: [
            { name: "小洋人", num: "6,724" },
            { name: "八喜", num: "5,980" },
            { name: "娃哈哈", num: "5,391" },
            { name: "喜之郎", num: "4,417" },
            { name: "好多鱼", num: "3,170" },
            { name: "可爱多", num: "2,086" },
        ],
        shandong: [
            { name: "好多鱼", num: "5,770" },
            { name: "喜之郎", num: "5,407" },
            { name: "娃哈哈", num: "5,341" },
            { name: "小洋人", num: "3,794" },
            { name: "可爱多", num: "2,016" },
            { name: "八喜", num: "1,089" },
        ],
    };

    // 鼠标移入到导航li, 生成li结构,添加到ul.sub
    // 1. 鼠标移入到导航li, 获取到data-city属性值
    // 2. 根据属性值去获取到数据(数组类型)
    // 3. 遍历数组数据, 根据一个对象 去生成一个li结构
    // 4. li结构添加到ul中

    var $top = $(".top");
    var $lis = $top.find(".sup li");
    var $ul = $top.find("ul.sub");

    $lis.mouseenter(function() {
        // 1. 
        var key = $(this).attr("data-city");
        // 2. 
        var itemData = data[key]; // 数组, 里面是对象
        // console.log(key, data[key]);

        // 清空ul里面所有的li(创建之前, 先把之前的清空掉)
        $ul.empty();

        // 3.
        for (var i = 0; i < itemData.length; i++) {
            // console.log( itemData[i] ); // 对象
            // 3.
            $('<li><span>' + itemData[i].name + '</span><span> ' + itemData[i].num + '<s class="icon-up"></s></span></li>').appendTo($ul);
        }

        // 当前的li高亮 active类名
        $(this).addClass("active").siblings().removeClass("active");

        // 导航li的mouseenter事件不要冒泡
        return false;
    });

    // 页面打开, 默认触发北京的鼠标移入事件, 生成li到ul中
    $lis.eq(0).mouseenter();

    // 自动播放
    var count = 0;

    function fn() {
        count = ++count % $lis.length;

        // jQ在触发mouseenter事件的时候, 会将该事件进行冒泡, 需要组织导航li的冒泡行为 ==> return false;
        // $lis.eq(count).mouseenter();
        $lis.eq(count).trigger("mouseenter");
    }
    var timerId = setInterval(fn, 1000);

    // 鼠标移入移出
    $top
        .mouseenter(function() {
            // console.log("$top mouseenter");
            clearInterval(timerId);
        })
        .mouseleave(function() {
            timerId = setInterval(fn, 1000);
        });
})();

// 地图
(function() {
    var geoCoordMap = {
        '新疆玛纳斯基地': [86.22, 44.30],
        '九江': [116.00, 29.70],
        '新乡': [116.402217, 35.311657],
        ' ': [79.92, 37.12],
        '  ': [86.85, 47.70],
        '若羌县': [88.17, 39.02],
        '上海': [121.4648, 31.2891],
        '东莞': [113.8953, 22.901],
        '东营': [118.7073, 37.5513],
        '中山': [113.4229, 22.478],
        '临汾': [111.4783, 36.1615],
        '临沂': [118.3118, 35.2936],
        '丹东': [124.541, 40.4242],
        '丽水': [119.5642, 28.1854],
        '乌鲁木齐': [87.9236, 43.5883],
        '佛山': [112.8955, 23.1097],
        '保定': [115.0488, 39.0948],
        '兰州': [103.5901, 36.3043],
        '包头': [110.3467, 41.4899],
        '北京': [116.4551, 40.2539],
        '北海': [109.314, 21.6211],
        '南京': [118.8062, 31.9208],
        '南宁': [108.479, 23.1152],
        '南昌': [116.0046, 28.6633],
        '南通': [121.1023, 32.1625],
        '厦门': [118.1689, 24.6478],
        '台州': [121.1353, 28.6688],
        '合肥': [117.29, 32.0581],
        '呼和浩特': [111.4124, 40.4901],
        '咸阳': [108.4131, 34.8706],
        '哈尔滨': [127.9688, 45.368],
        '唐山': [118.4766, 39.6826],
        '嘉兴': [120.9155, 30.6354],
        '大同': [113.7854, 39.8035],
        '大连': [122.2229, 39.4409],
        '天津': [117.4219, 39.4189],
        '太原': [112.3352, 37.9413],
        '威海': [121.9482, 37.1393],
        '宁波': [121.5967, 29.6466],
        '宝鸡': [107.1826, 34.3433],
        '宿迁': [118.5535, 33.7775],
        '常州': [119.4543, 31.5582],
        '广州': [113.5107, 23.2196],
        '廊坊': [116.521, 39.0509],
        '延安': [109.1052, 36.4252],
        '张家口': [115.1477, 40.8527],
        '徐州': [117.5208, 34.3268],
        '德州': [116.6858, 37.2107],
        '惠州': [114.6204, 23.1647],
        '成都': [103.9526, 30.7617],
        '扬州': [119.4653, 32.8162],
        '承德': [117.5757, 41.4075],
        '拉萨': [91.1865, 30.1465],
        '无锡': [120.3442, 31.5527],
        '日照': [119.2786, 35.5023],
        '昆明': [102.9199, 25.4663],
        '杭州': [119.5313, 29.8773],
        '枣庄': [117.323, 34.8926],
        '柳州': [109.3799, 24.9774],
        '株洲': [113.5327, 27.0319],
        '武汉': [114.3896, 30.6628],
        '汕头': [117.1692, 23.3405],
        '江门': [112.6318, 22.1484],
        '沈阳': [123.1238, 42.1216],
        '沧州': [116.8286, 38.2104],
        '河源': [114.917, 23.9722],
        '泉州': [118.3228, 25.1147],
        '泰安': [117.0264, 36.0516],
        '泰州': [120.0586, 32.5525],
        '济南': [117.1582, 36.8701],
        '济宁': [116.8286, 35.3375],
        '海口': [110.3893, 19.8516],
        '淄博': [118.0371, 36.6064],
        '淮安': [118.927, 33.4039],
        '深圳': [114.5435, 22.5439],
        '清远': [112.9175, 24.3292],
        '温州': [120.498, 27.8119],
        '渭南': [109.7864, 35.0299],
        '湖州': [119.8608, 30.7782],
        '湘潭': [112.5439, 27.7075],
        '滨州': [117.8174, 37.4963],
        '潍坊': [119.0918, 36.524],
        '烟台': [120.7397, 37.5128],
        '玉溪': [101.9312, 23.8898],
        '珠海': [113.7305, 22.1155],
        '盐城': [120.2234, 33.5577],
        '盘锦': [121.9482, 41.0449],
        '石家庄': [114.4995, 38.1006],
        '福州': [119.4543, 25.9222],
        '秦皇岛': [119.2126, 40.0232],
        '绍兴': [120.564, 29.7565],
        '聊城': [115.9167, 36.4032],
        '肇庆': [112.1265, 23.5822],
        '舟山': [122.2559, 30.2234],
        '苏州': [120.6519, 31.3989],
        '莱芜': [117.6526, 36.2714],
        '菏泽': [115.6201, 35.2057],
        '营口': [122.4316, 40.4297],
        '葫芦岛': [120.1575, 40.578],
        '衡水': [115.8838, 37.7161],
        '衢州': [118.6853, 28.8666],
        '西宁': [101.4038, 36.8207],
        '西安': [109.1162, 34.2004],
        '贵阳': [106.6992, 26.7682],
        '连云港': [119.1248, 34.552],
        '邢台': [114.8071, 37.2821],
        '邯郸': [114.4775, 36.535],
        '郑州': [113.4668, 34.6234],
        '鄂尔多斯': [108.9734, 39.2487],
        '重庆': [107.7539, 30.1904],
        '金华': [120.0037, 29.1028],
        '铜川': [109.0393, 35.1947],
        '银川': [106.3586, 38.1775],
        '镇江': [119.4763, 31.9702],
        '长春': [125.8154, 44.2584],
        '长沙': [113.0823, 28.2568],
        '长治': [112.8625, 36.4746],
        '阳泉': [113.4778, 38.0951],
        '青岛': [120.4651, 36.3373],
        '韶关': [113.7964, 24.7028]
    };

    var BJData = [
        [{
            name: '新乡'
        }, {
            name: '新乡',
            value: 200
        }],
        [{
            name: '新乡'
        }, {
            name: '呼和浩特',
            value: 90
        }],
        [{
            name: '新乡'
        }, {
            name: '哈尔滨',
            value: 90
        }],
        [{
            name: '新乡'
        }, {
            name: '石家庄',
            value: 90
        }],
        [{
            name: '新乡'
        }, {
            name: '昆明',
            value: 30
        }],
        [{
            name: '新乡'
        }, {
            name: '北京',
            value: 100
        }],
        [{
            name: '新乡'
        }, {
            name: '长春',
            value: 40
        }],
        [{
            name: '新乡'
        }, {
            name: '重庆',
            value: 40
        }],
        [{
            name: '新乡'
        }, {
            name: '贵阳',
            value: 50
        }],
        [{
            name: '新乡'
        }, {
            name: '南宁',
            value: 30
        }],
        [{
            name: '新乡'
        }, {
            name: '济南',
            value: 10
        }],
        [{
            name: '新乡'
        }, {
            name: '太原',
            value: 40
        }],
        [{
            name: '新乡'
        }, {
            name: '西安',
            value: 60
        }],
        [{
            name: '新乡'
        }, {
            name: '武汉',
            value: 50
        }],
        [{
            name: '新乡'
        }, {
            name: '合肥',
            value: 40
        }],
        [{
            name: '新乡'
        }, {
            name: '南京',
            value: 30
        }],
        [{
            name: '新乡'
        }, {
            name: '沈阳',
            value: 20
        }],
        [{
            name: '新乡'
        }, {
            name: '成都',
            value: 10
        }]
    ];

    var SHData = [
        [{
            name: '九江'
        }, {
            name: '九江',
            value: 200
        }],

        [{
            name: '九江'
        }, {
            name: '长沙',
            value: 95
        }],
        [{
            name: '九江'
        }, {
            name: '武汉',
            value: 30
        }],
        [{
            name: '九江'
        }, {
            name: '南昌',
            value: 20
        }],
        [{
            name: '九江'
        }, {
            name: '合肥',
            value: 70
        }],
        [{
            name: '九江'
        }, {
            name: '南京',
            value: 60
        }],
        [{
            name: '九江'
        }, {
            name: '福州',
            value: 50
        }],
        [{
            name: '九江'
        }, {
            name: '上海',
            value: 100
        }],
        [{
            name: '九江'
        }, {
            name: '深圳',
            value: 100
        }],

    ];

    var GZData = [
        [{
            name: '新疆玛纳斯基地'
        }, {
            name: '新疆玛纳斯基地',
            value: 200
        }],
        [{
            name: '新疆玛纳斯基地'
        }, {
            name: '  ',
            value: 90
        }],
        [{
            name: '新疆玛纳斯基地'
        }, {
            name: ' ',
            value: 40
        }],
        [{
            name: '新疆玛纳斯基地'
        }, {
            name: '呼和浩特',
            value: 90
        }],
        [{
            name: '新疆玛纳斯基地'
        }, {
            name: '昆明',
            value: 40
        }],
        [{
            name: '新疆玛纳斯基地'
        }, {
            name: '成都',
            value: 10
        }],
        [{
            name: '新疆玛纳斯基地'
        }, {
            name: '兰州',
            value: 95
        }],
        [{
            name: '新疆玛纳斯基地'
        }, {
            name: '银川',
            value: 90
        }],
        [{
            name: '新疆玛纳斯基地'
        }, {
            name: '西宁',
            value: 80
        }],

    ];

    var planePath = 'path://M.6,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705';

    var convertData = function(data) {
        var res = [];
        for (var i = 0; i < data.length; i++) {
            var dataItem = data[i];
            var fromCoord = geoCoordMap[dataItem[0].name];
            var toCoord = geoCoordMap[dataItem[1].name];
            if (fromCoord && toCoord) {
                res.push([{
                    coord: fromCoord
                }, {
                    coord: toCoord
                }]);
            }
        }
        return res;
    };

    var color = ['#3ed4ff', '#ffa022', '#a6c84c'];
    var series = [];
    [
        ['新乡', BJData],
        ['九江', SHData],
        ['新疆', GZData]
    ].forEach(function(item, i) {
        series.push({
            name: item[0] + ' Top10',
            type: 'lines',
            zlevel: 1,
            effect: {
                show: true,
                period: 6,
                trailLength: 0.7,
                color: '#fff',
                symbolSize: 3
            },
            lineStyle: {
                normal: {
                    color: color[i],
                    width: 0,
                    curveness: 0.2
                }
            },
            data: convertData(item[1])
        }, {
            name: item[0] + ' Top10',
            type: 'lines',
            zlevel: 2,
            effect: {
                show: true,
                period: 6,
                trailLength: 0,
                symbol: planePath,
                symbolSize: 15
            },
            lineStyle: {
                normal: {
                    color: color[i],
                    width: 1,
                    opacity: 0.4,
                    curveness: 0.2
                }
            },
            data: convertData(item[1])
        }, {
            name: item[0] + ' Top10',
            type: 'effectScatter',
            coordinateSystem: 'geo',
            zlevel: 2,
            rippleEffect: {
                brushType: 'stroke'
            },
            label: {
                normal: {
                    show: true,
                    position: 'right',
                    formatter: '{b}'
                }
            },
            symbolSize: function(val) {
                return val[2] / 8;
            },
            itemStyle: {
                normal: {
                    color: color[i]
                }
            },
            data: item[1].map(function(dataItem) {
                return {
                    name: dataItem[1].name,
                    value: geoCoordMap[dataItem[1].name].concat([dataItem[1].value])
                };
            })
        });
    });

    var option = {
        // backgroundColor: '#080a20',
        title: {
            text: '模拟迁徙',
            subtext: '数据纯属虚构',
            left: 'left',
            textStyle: {
                color: '#fff'
            }
        },
        tooltip: {
            trigger: 'item'
        },
        legend: {
            orient: 'vertical',
            top: 'bottom',
            left: 'right',
            data: ['北京 Top10', '上海 Top10', '广州 Top10'],
            textStyle: {
                color: '#fff'
            },
            selectedMode: 'single'
        },
        geo: {
            map: 'china',
            zoom: 1.2,
            label: {
                emphasis: {
                    show: false
                }
            },
            roam: true,
            itemStyle: {
                normal: {
                    areaColor: '#132937',
                    borderColor: '#0692a4'
                },
                emphasis: {
                    areaColor: '#0b1c2d'
                }
            }
        },
        series: series
    };

    var myCharts = echarts.init( $(".map .geo")[0] );
    myCharts.setOption(option);
})()
