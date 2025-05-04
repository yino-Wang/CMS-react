import * as echarts from 'echarts';
import { useEffect, useRef } from 'react';
//封装chart组件 解决复用问题 将可变的title作为props
const BarChart = ({title}) => {
const chartRef = useRef(null)
    useEffect(() => {
        //保证dom可用 才进行图表渲染 所以要用useeffect
        //获取 DOM 元素
        var chartDom = chartRef.current
        //用 ECharts 初始化这个 DOM 元素，生成一个图表实例对象 myChart
        var myChart = echarts.init(chartDom); 
        var option;

        //准备图表参数
        option = { 
        title: {
            text: title
        },
        xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
            data: [190, 200, 150, 80, 70, 110, 130],
            type: 'bar'
            }
        ]
        };
        //如果 option 存在，就使用它来渲染图表
        option && myChart.setOption(option);
    },[])
    return (
        <div>
            {/**ECharts 需要容器有具体的宽高才能正确渲染图表。如果不设置宽高，容器大小默认为 0×0，图表将无法显示或显示异常 */}
            <div ref={chartRef} style={{width: '500px', height: '400px'}}></div>
        </div>
    )
}
export default BarChart