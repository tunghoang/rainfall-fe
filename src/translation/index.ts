import TRANSLATION_MAP from './translation'
export default function _tr(text) {
    const language = localStorage.getItem('lang') || 'vi';
    return (TRANSLATION_MAP[language] || {})[text] || text;
}
