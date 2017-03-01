import genusTypes       from '../../../../constants/genus_types';
import { scrub }        from '../../serializer_utils';

export function baseSerializeQuestion(originalItem, newAttributes) {
  return {
    id: originalItem.question.id,
    genusTypeId: genusTypes.question[originalItem.type],
    questionString: newAttributes.text,
  };
}

export function baseSerializeItem(originalItem, newAttributes) {
  const newItem = {
    id: originalItem.id,
    genusTypeId: genusTypes.item[originalItem.type],
    name: newAttributes.name || originalItem.name,
    question: baseSerializeQuestion(originalItem, newAttributes.question || {}),
    answers: null,
  };
  newItem.question = scrub(newItem.question);
  return newItem;
}

export function baseItem(originalItem, newAttributes) {
  return scrub(baseSerializeItem(originalItem, newAttributes));
}

export default baseSerializeItem;
