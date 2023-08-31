
/** 
 * Version 1.0
 * JJ Harry
 * 
 * Initial function called by the button on the template sheet
 * 
 * TODO: Add timestamp to form name []
 * TODO: Make FolderID Dynamic []
 * TODO: Consolidate Data to 1 Sheet []
 */
function generateSurvey() {
  const workbook = SpreadsheetApp.getActive();
  const workbookName = SpreadsheetApp.getActive().getName();
  const sheets = workbook.getSheets();
  createForm(workbookName, sheets)
}

/**
 * Generate the form using the data captured in the generateSurvey method
 * @param {String}  surveyName     This will always be the name of the template sheet.
 * @param {Array}  data   Array of the data captured by the generateSurvey to be manipulated into a form
 */
function createForm( surveyName, data ){
  var d = new Date();
  var currentTime = d.toLocaleTimeString()
  var form = FormApp.create(surveyName+"/"+currentTime);

  // skipping i=0 since that sheet will contain documentation for the template sheet
  for( i=1; i<data.length; i++ ){
    var sectionVals = data[i].getDataRange().getValues();
    var item = form.addPageBreakItem();
    item.setTitle(data[i].getName());
    item.setHelpText(sectionVals[0][0]);
    
    // skipping row=0 since that position will contain the description of the section
    for ( row = 1; row < sectionVals.length; row++){
      var choices = [];

      // skipping choice=0 since that position will have the question title.
      for( var choice = 1; choice < sectionVals[row].length; choice++ ){
        choices.push(sectionVals[row][choice]);
      }
      form.addMultipleChoiceItem()
      .setTitle(sectionVals[row][0])
      .setChoiceValues( choices );
    }
  }
  
  // TODO: Make the folderId dynamic
  var folder = DriveApp.getFolderById('1M9afcng_99-ZNC7ofmN95ybzEKYREA3U');

  // Send the form and target to function that saves the form in the desired location
  saveItemInFolder(form, folder);
}

