//This code was supplied by Dom during his office hours and 
//therefore could be similar to other student's code
function InitDashboard(){
    //Populate dropdown
    var selector = d3.select("#selDataset");
    d3.json("samples.json").then(data => {
        console.log(data);
        var samplenames = data.names;
        samplenames.forEach(sampleID => {
            selector.append("option").text(sampleID).property("value", sampleID);
        });
    });
    //Update Bargraph
}
InitDashboard();