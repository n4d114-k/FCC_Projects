async function heatMap(){

    const {monthlyVariance: dataset , baseTemperature} = await d3.json("https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json");
    const colorData = ['#fff5f0','#fee0d2','#fcbba1','#fc9272','#fb6a4a','#ef3b2c','#cb181d','#99000d']
    const yAccessor = d => new Date(0,d.month -1,0)
    const xAccessor = d => d.year
    const colorMetricAccessor = d => Math.round( (baseTemperature + d.variance) * 100)/100 // this function give me the temp of a month
    const monthFormat = d3.timeFormat("%B");

    let dimensions = {
        width: window.innerWidth * 0.9 <= 600 ? window.innerWidth * 0.9 : 1100,
        height: 400,
        margin: {
            top: 30,
            right: 30,
            bottom: 60,
            left: 80,
        },
    }

    dimensions.boundedWidth = dimensions.width - dimensions.margin.left  - dimensions.margin.right ;
    dimensions.boundedHeight = dimensions.height - dimensions.margin.top - dimensions.margin.bottom ;

    const wrapper = d3.select("#wrapper")
                      .append('svg')
                      .attr('width',dimensions.width)
                      .attr('height',dimensions.height)

    const bounds = wrapper.append('g')
                          .style('transform', `translate(${
                                dimensions.margin.left
                            }px, ${
                                dimensions.margin.top
                            }px)`);

    const yScale = d3.scaleTime()
                      .domain([new Date(0,0,0),new Date(0,12,0)])
                      .range([0,dimensions.boundedHeight])



    const xScale = d3.scaleLinear()
                      .domain([d3.min(dataset,xAccessor), d3.max(dataset,xAccessor) + 1])
                      .range([0,dimensions.boundedWidth])

    const colorScale = (d) => {
        const temperature = colorMetricAccessor(d);
        const [tmin,tmax] = d3.extent(dataset,colorMetricAccessor)
        const domain = tmax - tmin;
        const q1 = domain*.125 + 1.68;
        const q2 = domain*.25 + 1.68;
        const q3 = domain*.375 + 1.68;
        const q4 = domain*.5 + 1.68;
        const q5 = domain*.625 + 1.68;
        const q6 = domain*.75 + 1.68;
        const q7 = domain*.875 + 1.68;
        const q8 = domain*1 + 1.68;

        if(temperature <= q1) return "#fff5f0"
        if(temperature <= q2) return "#fee0d2"
        if(temperature <= q3) return "#fcbba1"
        if(temperature <= q4) return "#fc9272"
        if(temperature <= q5) return "#fb6a4a"
        if(temperature <= q6) return "#ef3b2c"
        if(temperature <= q7) return "#cb181d"
        if(temperature <= q8) return "#99000d"
    }

    const tooltip = d3.select('#tooltip');
    const updateTransition = d3.transition().duration(100);
    const cellHeight = dimensions.boundedHeight/12
    const cellWidth = dimensions.boundedWidth/(xScale.domain()[1] - xScale.domain()[0])

    const cells  =  bounds.selectAll('rect')
                          .data(dataset)
                          .enter()
                          .append("rect")
                          .attr('class','cell')
                          .attr('data-month',d => d.month - 1)
                          .attr('data-year',d => xAccessor(d))
                          .attr('data-temp',d=> Math.round((8.66 + d.variance)*100)/100)
                          .attr('fill', "#fff")
                          .attr("height",cellHeight)
                          .attr("width",cellWidth)
                          .attr("x", 0)
                          .attr("y",d => yScale(yAccessor(d)))


    cells.transition(updateTransition)
        .attr('x',d => xScale(xAccessor(d)))
        .attr("fill",d => colorScale(d))

    const xAxisGenerator = d3.axisBottom()
                              .scale(xScale)
                              .tickFormat(d3.format("d"))

    const yAxisGenerator = d3.axisLeft()
                              .scale(yScale)
                              .tickFormat(monthFormat)

    const xAxis = bounds.append("g")
                        .attr("id","x-axis")
                        .style("transform", `translateY(${dimensions.boundedHeight}px)`)
                        .call(xAxisGenerator)

    const xAxisLabel = xAxis.append("text")
                            .attr("x", dimensions.boundedWidth/2)
                            .attr("y", dimensions.margin.bottom - 20)
                            .attr("fill", "var(--black)")
                            .style("font-size", "1.4em")
                            .html("Year");

    const yAxis = bounds.append("g")
                        .attr("id","y-axis")
                        .call(yAxisGenerator)


    const yAxisLabel = yAxis.append("text")
                            .attr("x", -dimensions.boundedHeight / 2)
                            .attr("y", -dimensions.margin.left + 20)
                            .attr("fill", "var(--black)")
                            .style("font-size", "1.4em")
                            .text("Months")
                            .style("transform", "rotate(-90deg)")
                            .style("text-anchor", "middle");

    yAxis.selectAll('.tick')
        .style("transform", (d,i) => `translateY(${i * cellHeight + cellHeight/2}px)`);

    const legend = d3.select("#legend")
                      .append("svg")
                      .attr('width',dimensions.width *.3 )
                      .attr('height',dimensions.height *.18)
                      .style('display','block')


    const legendsBounds = legend.append('g')
                                .style('transform', `translate(10px ,0)`);

    const colorScaleAxis = d3.scaleLinear()
                              .domain(d3.extent(dataset,colorMetricAccessor))
                              .range([0,(dimensions.width *.3) -20])
                              .nice()

    const legendCells = legendsBounds.selectAll('rect')
                                    .data(colorData)
                                    .enter()
                                    .append("rect")
                                    .attr('fill' ,d => d)
                                    .attr('width', (dimensions.width *.3 - 20)/colorData.length)
                                    .attr('height', dimensions.height *.1 - 20)
                                    .attr('x', (d,i) => i*(dimensions.width *.3 - 20)/colorData.length)
                                    .attr('y', 10)
                                    .attr("class",'rect')

    const axisLegendGenerator = d3.axisBottom()
                                  .scale(colorScaleAxis)

    const xAxisLegend = legendsBounds.append("g")
                                    .style("transform", `translateY(${dimensions.height*.1 -10}px)`)
                                    .call(axisLegendGenerator)

    const xAxisLegendLabel = xAxisLegend.append("text")
                                        .attr("x", (dimensions.width *.3 - 20)/2)
                                        .attr("y", 30)
                                        .attr("fill", "var(--black)")
                                        .style("font-size", "1.4em")
                                        .html("Temperature Values ℃");

    cells.on("mouseenter", onMouseEnter)
        .on("mouseleave", onMouseLeave)

    function onMouseEnter(datum,index){
        const x = xScale(xAccessor(index)) + dimensions.margin.left;
        const y = yScale(yAccessor(index)) + dimensions.margin.top;

        tooltip.attr("data-year",index.year)
              .style('opacity',1)
              .style("transform",`translate(calc(-50% + ${x}px) , calc(-118% + ${y}px) )`)

        tooltip.select("#data").text(`Year: ${index.year}, Month: ${monthFormat(new Date(0,index.month, 0))}`);
        tooltip.select("#temperature").text(`Temperature: ${colorMetricAccessor(index)} ℃`);
    }

    function onMouseLeave(datum,index){
        tooltip.style('opacity',0)
    }
}

heatMap()
