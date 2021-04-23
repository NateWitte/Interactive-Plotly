//This code was supplied by Dom during his office hours and 
//therefore could be similar to other student's code
function DrawBargraph(sampleid) {

}

function DrawBubbleChart(sampleid) {
    
}

function ShowMetaData(sampleid) {
    
}
function InitDashboard(){
    //Populate dropdown
    var selector = d3.select("#selDataset");
    d3.json("samples.json").then(data => {
        console.log(data);
        var samplenames = data.names;
        samplenames.forEach(sampleID => {
            selector.append("option").text(sampleID).property("value", sampleID);
        });
        var id = sampleNames[0];
        DrawBargraph(id);
        DrawBubbleChart(id);
        ShowMetaData(id);
    });
    //Update Bargraph
}
InitDashboard();