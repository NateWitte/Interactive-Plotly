//This code was supplied by Dom during his office hours and 
//therefore could be similar to other student's code
function DrawBargraph(sampleid) {
    d3.json("../data/samples.json").then(data => {
        var samples = data.samples;
        var resultsArray = samples.filter(s => s.id == sampleid);
        var result = resultsArray[0];
        var otu_ids = result.otu_ids;
        var otu_labels = result.otu_labels;
        var sample_values = result.sample_values;
        yticks = otu_ids.slice(0,10).map(otuID => `OTU ${otuID}`).reverse();
        var barData = {
            x: sample_values.slice(0, 10).reverse(),
            y: yticks,
            type: "bar",
            text: otu_labels.slice(0,10).reverse(),
            orientation: "h"
        }
        var barArray = [barData];
        var barLayout = {
            title: "Top 10 Bacteria Cultures Found",
            margin: {t: 30, l: 150}
        }
        Plotly.newPlot("bar", barArray, barLayout);
    });
}

function DrawBubbleChart(sampleid) {
    d3.json("../data/samples.json").then(data => {
        var samples = data.samples;
        var resultsArray = samples.filter(s => s.id == sampleid);
        var result = resultsArray[0];
        var otu_ids = result.otu_ids;
        var otu_labels = result.otu_labels;
        var sample_values = result.sample_values;
        var bubbleData = {
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: "markers",
            marker: {
                color: otu_ids,
                size: sample_values
            }
        }
        var bubbleArray = [bubbleData];
        var bubbleLayout = {
            title: "Bacteria Cultures Found by Size",
            margin: {t: 30, l: 150}
        }
        Plotly.newPlot("bubble", bubbleArray, bubbleLayout);
    });
}

function ShowMetaData(sampleid) {
    d3.json("../data/samples.json").then(data => {
        var metadata = data.metadata;
        var resultsArray = metadata.filter(m => m.id == sampleid);
        var result = resultsArray[0];
        var metadatastring = "";
        for (const [key, value] of Object.entries(result)) {
            metadatastring += `${key}: ${value} <br>`;
        };
        d3.select("#sample-metadata").html(metadatastring);
    });
}
function optionChanged(newsampleid){
    DrawBargraph(newsampleid);
    DrawBubbleChart(newsampleid);
    ShowMetaData(newsampleid);
}
function InitDashboard(){
    //Populate dropdown
    var selector = d3.select("#selDataset");
    d3.json("../data/samples.json").then(data => {
        var samplenames = data.names;
        samplenames.forEach(sampleID => {
            selector.append("option").text(sampleID).property("value", sampleID);
        });
        var id = samplenames[0];
        DrawBargraph(id);
        DrawBubbleChart(id);
        ShowMetaData(id);
    });
    //Update Bargraph
}
InitDashboard();