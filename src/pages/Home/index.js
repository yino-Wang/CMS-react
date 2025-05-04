import * as echarts from 'echarts';
import { useEffect, useRef } from 'react';
import BarChart from './components/BarChart';

const Home = () => {
    return (
        <div>
            <BarChart title = {'Satisfaction'}></BarChart>
            <BarChart title = {'Usage'}></BarChart>
        </div>
    )
}

export default Home