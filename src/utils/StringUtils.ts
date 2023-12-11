export default class StringUtils {
  replacePlaceholder(template: string, ...values: string[]) {
    return values.reduce((acc, currentValue, index) => {
      const placeholder = new RegExp(`\\{${index}\\}`, 'g');
      return acc.replace(placeholder, currentValue);
    }, template);
  }
}
