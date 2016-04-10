/**
 * D3 Hanlder
 * @author sunxiaojiao
 */

$(function() {
    var margin = {top: 20, right:20, bottom: 20, left: 20};
    var width = 700
        ,height = 380;
    var container = d3.select('.check-trend');
    var svg = container.append('svg')
        .attr('width', width + margin.right + margin.left)
        .attr('height', height + margin.top + margin.bottom);
    //数据
    var data = [10,20,30,40,60,100,150];
    //比例尺
    var x = d3.time.scale()
        .domain([d3.extent(data, function(d) {return d.day;})])
        .range([0, width]);
    var y = d3.scale.linear()
        .domain([0, d3.max(data, function(d) {return d.value;})])
        .range([height, 0]);

    //绘制坐标轴
    var xAxis = d3.svg.axis()
        .scale(x)
        .orient('bottom')
        .ticks(30);
    var yAxis = d3.svg.axis()
        .scale(y)
        .orient('left')
        .ticks(10);

    svg.append('g')
        .attr('class', 'x axis')
        .attr('transform', 'translate(0, '+ height +')')
        .call(xAxis)
        .append('text')
        .text('日期')
        .attr('transform', 'translate(' + width + ', 0)');

    svg.append('g')
        .attr('class', 'y axis')
        //.attr('transform', 'translate('+  +')')
        .call(yAxis)
        .append('text')
        .text('天');

});
