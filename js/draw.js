var nodes = [];
var edges = [];
var network = null;

var hash = {};

// Global counters
var idCounter = 1;

//
function parseData(inputData) {
    // First loop: define all nodes
    inputData.forEach(function(entry) {
        // Push current entry into node array
        nodes.push({
            id: idCounter,
            value: entry.weight,
            label: entry.title
        });

        // Set hash of current node
        hash[entry.title] = idCounter;
        idCounter++;
    });

    // Second loop: define all edges
    inputData.forEach(function(entry) {
        // For each outgoing edge, draw it
        if (entry.outgoing_edges) {
            entry.outgoing_edges.forEach(function(edge) {
                edges.push({
                    from: hash[entry.title],
                    to: hash[edge.destination],
                    value: edge.weight,
                    title: edge.weight + ' references',
                    arrows: 'to'
                });
            });
        }
    });
}



function draw(inputData) {
    parseData(inputData);

    // Instantiate our network object.
    var container = document.getElementById('main_network');
    var data = {
        nodes: nodes,
        edges: edges
    };
    var options = {
        layout: {
          improvedLayout: false
        },
        nodes: {
            shape: 'dot',
            font: {
                size: 32,
                color: '#ffffff'
            },
            scaling: {
                min: 10,
                max: 35,
                label: {
                    min: 8,
                    max: 20
                }
            }
        },
        physics: true,
        edges: {
            scaling: {
                min: 1,
                max: 10,
                label: {
                    min: 8,
                    max: 20
                }
            },
            smooth: {
                type: 'continuous'
            }
        }
    };
    network = new vis.Network(container, data, options);
}

  function loadData(property){

    property="Was_written_by";
    $.getJSON('http://localhost:3031/query?property=' + property, function(data) {
      //data is the JSON string
      draw(data);
      //console.log(data);
    });

  }
