javascript: (() => {
  const observations = document.querySelectorAll(".Observation");
  if (observations.length === 0) {
    alert("No eBird observations found on page!");
    return;
  }
  if (document.querySelector("[data-species]")) {
    alert(
      "Already run script. If you are having issues, reload page and try again."
    );
    return;
  }
  const parentContainer = observations[0].parentNode;

  function getSpeciesName(observation) {
    return observation.querySelector(".Observation-species .Heading-main")
      .innerText;
  }

  function getUniqueSpeciesList(observations) {
    let uniqueSpecies = new Set();
    for (const observation of observations) {
      const commonName = getSpeciesName(observation);
      uniqueSpecies.add(commonName);
    }
    return uniqueSpecies;
  }

  function createUniqueSpeciesWrappers(uniqueSpeciesArray, containerNode) {
    for (const species of uniqueSpeciesArray) {
      // Create wrapper node
      const detailsNode = document.createElement("details");
      // Add data-species attribute
      detailsNode.setAttribute("data-species", species);
      // Add spacing styles
      detailsNode.setAttribute("style", "margin-top: 0.5em");
      // Create summary node
      const summaryNode = document.createElement("summary");
      // Style to visually indicate clickability
      summaryNode.setAttribute("style", "cursor: pointer; list-style:");
      // Insert species name into summary element
      summaryNode.innerText = species;
      // Add summary element to details
      detailsNode.appendChild(summaryNode);
      // Add details element to container
      containerNode.appendChild(detailsNode);
    }
  }

  function moveObservationsIntoWrappers(observations) {
    for (let observation of observations) {
      const commonName = getSpeciesName(observation);
      const detailNode = document.querySelector(
        `[data-species="${commonName}"]`
      );
      const spacerNode = observation.previousElementSibling;
      detailNode.appendChild(spacerNode);
      detailNode.appendChild(observation);
    }
  }

  function appendSpeciesObsCount(list) {
    for (species of list) {
      const observationCount = document
        .querySelectorAll(`[data-species="${species}"] .Observation`)
        .length.toString();
      const summaryNode = document.querySelector(
        `[data-species="${species}"] summary`
      );
      summaryNode.innerText = `${summaryNode.innerText} (${observationCount})`;
    }
  }

  // GO GO GO!
  const uniqueSpeciesList = getUniqueSpeciesList(observations);
  createUniqueSpeciesWrappers(uniqueSpeciesList, parentContainer);
  moveObservationsIntoWrappers(observations);
  appendSpeciesObsCount(uniqueSpeciesList);
})();
