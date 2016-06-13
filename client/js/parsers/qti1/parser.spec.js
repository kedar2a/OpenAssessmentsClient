import Assessment         from './parser';
import $                  from 'jquery';

describe('assessment', () => {

  var settings;

  beforeAll(() => {
    jasmine.getFixtures().fixturesPath = "base/specs_support/fixtures";
    settings = {};
  });

  describe('parseAssessment', () => {

    it('parses assessment xml from QTI into an object', () => {
      var data       = readFixtures("qti1/assessment.xml");
      var assessment = Assessment.parseAssessment(settings, data);

      expect(assessment).toBeDefined();
      expect(assessment.id).toEqual("ib8d9c142765b2287684aad0b5387e45b");
      expect(assessment.title).toEqual("MIT Questions 1");
      expect(assessment.standard).toEqual("qti");
      expect(assessment.sections.length).toEqual(1);
      expect(assessment.sections[0].items.length).toEqual(10);
      var item = assessment.sections[0].items[0];
      expect(item.assessment_question_identifierref).toEqual("icee9d09b0a2ace374f01019034d68155");
      expect(item.id).toEqual("i3590da31ca486c260f96e955482aca41");
      expect(item.title).toEqual("Question 1");
    });
  });

  describe('parse', () => {

    it('parses assessment xml from QTI into an object', () => {
      var data          = readFixtures("qti1/text.xml");
      var xml           = $(data);
      var assessmentXml = xml.find('assessment').addBack('assessment');
      var assessment = Assessment.parseAssessment(1, assessmentXml, xml);

      expect(assessment).toBeDefined();
      expect(assessment.id).toEqual("i0886cfce85384de6a5b5394edca8282f_summative");
      expect(assessment.title).toEqual("Financial Markets and System");
      expect(assessment.standard).toEqual("qti");
      expect(assessment.sections.length).toEqual(7);
      expect(assessment.sections[0].items.length).toEqual(44);
      var item = assessment.sections[0].items[0];
      expect(item.id).toEqual("3567");
    });

  });

  describe('parseSections', () => {

    it('find sections in the given qti', () => {
      var data = readFixtures("qti1/cells.xml");
      var sections = Qti.parseSections($(data));
      expect(sections.length).toEqual(1);
      var section = sections[0];
      expect(section.id).toEqual("root_section");
      expect(section.standard).toEqual("qti");
      expect(section.items.length).toEqual(3);
    });

  });


});