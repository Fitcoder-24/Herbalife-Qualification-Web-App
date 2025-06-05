function doGet() {
  return HtmlService.createHtmlOutputFromFile('index')
    .setTitle('Herbalife May Reward Lookup')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function searchUser(query) {
  query = query.toLowerCase();
  const sheet = SpreadsheetApp.openById("1MVqUPbrdALi6vrCEf6k5EWIGpP0reQFWYyQ0cI_CGrk").getSheets()[0];
  const data = sheet.getDataRange().getValues();
  const results = [];

  for (let i = 1; i < data.length; i++) {
    const id = String(data[i][0]);
    const name = String(data[i][1]);
    const teamLevel = String(data[i][2]);
    const sponsor = String(data[i][3]);
    const vp = Number(data[i][5]) || 0;

    if (id.toLowerCase().includes(query) || name.toLowerCase().includes(query)) {
      results.push({
        id,
        name,
        teamLevel,
        sponsor,
        vp
      });
    }
  }
  return results;
}

function getQualifiedList() {
  const sheet = SpreadsheetApp.openById("1MVqUPbrdALi6vrCEf6k5EWIGpP0reQFWYyQ0cI_CGrk").getSheets()[0];
  const data = sheet.getDataRange().getValues();
  const qualifiedList = [];

  for (let i = 1; i < data.length; i++) {
    const name = data[i][1];
    const vp = Number(data[i][5]) || 0;

    if (vp >= 300) {
      let reward = "";
      if (vp >= 1000) reward = "Formula 1";
      else if (vp >= 500) reward = "Dinoshake";
      else reward = "Afresh";

      qualifiedList.push({ name, reward });
    }
  }
  return qualifiedList;
}
