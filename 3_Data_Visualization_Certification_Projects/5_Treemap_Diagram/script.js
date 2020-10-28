const width = 1200;
const height = 600;
const padding = 35;

const svg = d3.select("svg");
svg.attr("viewBox", `0 0 1400 850`);

const tooltip = d3.select("#tooltip")
                  .style("position", "absolute")
                  .style("visibility", "hidden")
                  .attr("class", "tooltip")
                  .attr("id", "tooltip");

const legendContainer = [
  { color: "#33a02c", movieType: "Biography" },
  { color: "#fb9a99", movieType: "Family" },
  { color: "#b2df8a", movieType: "Animation" },
  { color: "#a6cee3", movieType: "Drama" },
  { color: "#fdbf6f", movieType: "Comedy" },
  { color: "#1f78b4", movieType: "Adventure" },
  { color: "#e31a1c", movieType: "Action" }
];

const calculateGross = (num) => {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
};

const setLegendContainer = () => {
  svg.append("text")
    .attr("x", width + 180 + padding)
    .attr("y", 160)
    .text("Category")
    .attr("fill", "var(--green)");

  const legend = svg.append("g")
                    .attr("id", "legend")
                    .attr("fill", "var(--green)")
                    .selectAll("#legend")
                    .data(legendContainer)
                    .enter()
                    .append("g")
                    .attr("transform", (d, i) => {
                      return "translate(0," + (height / 2 - i * 20) + ")";
                    });

  legend.append("rect")
        .attr("class", "legend-item")
        .attr("x", width + 200 - 18 + padding)
        .attr("y", 0)
        .attr("width", 25)
        .attr("height", 25)
        .attr("fill", (elem) => {
          return elem.color;
        })
        .style("stroke", "var(--black)");

  legend.append("text")
      .attr("x", width + 230 - 18 + padding)
      .attr("y", 18)
      .text((d) => {
        return d.movieType;
      });
};

const drawTreeMap = (movies) => {
  const hierarchy = d3.hierarchy(movies, (node) => {
      return node.children;
    })
    .sum((node) => {
      return node.value;
    })
    .sort((node1, node2) => {
      return node2.value - node1.value;
    });

  const treemap = d3.treemap().size([1400, 755]);
  treemap(hierarchy);
  const cell = svg.selectAll("g")
                  .data(hierarchy.leaves())
                  .enter().append("g")
                  .attr("transform", (elem) => {
                    return "translate(" + elem.x0 + "," + elem.y0 + ")";
                  });

  const tile = cell.append("rect")
                  .attr("class", "tile")
                  .attr("fill", (elem) => {
                    const movieCategory = elem.data.category;
                    switch (movieCategory) {
                      case "Action":
                        return "#e31a1c";
                      case "Adventure":
                        return "#1f78b4";
                      case "Comedy":
                        return "#fdbf6f";
                      case "Drama":
                        return "#a6cee3";
                      case "Animation":
                        return "#b2df8a";
                      case "Family":
                        return "#fb9a99";
                      case "Biography":
                        return "#33a02c";
                    }
    })
    .attr("data-name", (elem) => {
      return elem.data.name;
    })
    .attr("data-category", (elem) => {
      return elem.data.category;
    })
    .attr("data-value", (elem) => {
      return elem.data.value;
    })
    .attr("width", (elem) => {
      return elem.x1 - elem.x0;
    })
    .attr("height", (elem) => {
      return elem.y1 - elem.y0;
    })
    .style("stroke", "var(--black)")
    .on("mouseover", (d, i) => {
      tooltip.style("visibility", "visible");
      tooltip.html(
          `${d.data.name} <br>
           Gross: $${calculateGross(d.data.value)}
         `
        )
        .style("top", event.pageY - 2 + "px")
        .style("left", event.pageX + 10 + "px")
        .attr("data-value", () => {
          return d.data.value;
        });
    })
    .on("mouseout", (d) => {
      tooltip.style("visibility", "hidden");
    });

  cell.append("text")
      .selectAll("tspan")
      .data((d) => {
        return d.data.name.split(/(?=[A-Z][^A-Z])/g);
      })
      .enter()
      .append("tspan")
      .attr("x", 4)
      .attr("y", (d, i) => {
        return 13 + i * 10;
      })
      .text((d) => {
        return d;
      })
      .attr("font-size", "0.5em")
      .attr("color", "var(--black)");

  setLegendContainer();
};

fetch(
  "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/movie-data.json"
)
  .then((response) => response.json())
  .then((res) => {
    drawTreeMap(res);
  });
