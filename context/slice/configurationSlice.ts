import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

type configState = {
    language:Array<Object>
    genre:Object

}
const initialState = {
    language: [{"key":"an","value":"Aragonese"},{"key":"ak","value":"Akan"},{"key":"cr","value":"Cree"},
    {"key":"az","value":"Azerbaijani"},{"key":"cs","value":"Czech"},{"key":"aa","value":"Afar"},{"key":"br","value":"Breton"},
    {"key":"af","value":"Afrikaans"},{"key":"bo","value":"Tibetan"},{"key":"ce","value":"Chechen"},{"key":"kw","value":"Cornish"},{"key":"fo","value":"Faroese"},
    {"key":"la","value":"Latin"},{"key":"ng","value":"Ndonga"},{"key":"sc","value":"Sardinian"},{"key":"ti","value":"Tigrinya"},{"key":"tn","value":"Tswana"},{"key":"tr","value":"Turkish"},
    {"key":"pa","value":"Punjabi"},{"key":"et","value":"Estonian"},{"key":"fr","value":"French"},{"key":"ha","value":"Hausa"},{"key":"is","value":"Icelandic"},{"key":"li","value":"Limburgish"},{"key":"ln","value":"Lingala"},{"key":"ss","value":"Swati"},
    {"key":"ab","value":"Abkhazian"},{"key":"sh","value":"Serbo-Croatian"},{"key":"eu","value":"Basque"},{"key":"fy","value":"Frisian"},{"key":"ja","value":"Japanese"},{"key":"oj","value":"Ojibwa"},{"key":"or","value":"Oriya"},{"key":"pi","value":"Pali"},{"key":"su","value":"Sundanese"},
    {"key":"th","value":"Thai"},{"key":"ig","value":"Igbo"},{"key":"id","value":"Indonesian"},{"key":"kk","value":"Kazakh"},{"key":"ki","value":"Kikuyu"},{"key":"ug","value":"Uighur"},{"key":"ve","value":"Venda"},{"key":"rw","value":"Kinyarwanda"},{"key":"mi","value":"Maori"},{"key":"nv","value":"Navajo"},{"key":"hi","value":"Hindi"},{"key":"pt","value":"Portuguese"},
    {"key":"sg","value":"Sango"},{"key":"sk","value":"Slovak"},{"key":"sr","value":"Serbian"},{"key":"ty","value":"Tahitian"},{"key":"xh","value":"Xhosa"},{"key":"ar","value":"Arabic"},{"key":"co","value":"Corsican"},{"key":"bi","value":"Bislama"},{"key":"eo","value":"Esperanto"},{"key":"hz","value":"Herero"},{"key":"fi","value":"Finnish"},{"key":"iu","value":"Inuktitut"},{"key":"lv","value":"Latvian"},{"key":"it","value":"Italian"},{"key":"nl","value":"Dutch"},
    {"key":"kn","value":"Kannada"},{"key":"sa","value":"Sanskrit"},{"key":"sq","value":"Albanian"},{"key":"tl","value":"Tagalog"},{"key":"lb","value":"Letzeburgesch"},{"key":"ts","value":"Tsonga"},{"key":"ml","value":"Malayalam"},{"key":"vo","value":"Volapük"},{"key":"zu","value":"Zulu"},{"key":"os","value":"Ossetian; Ossetic"},{"key":"sm","value":"Samoan"},{"key":"za","value":"Zhuang"},{"key":"bn","value":"Bengali"},{"key":"cu","value":"Slavic"},{"key":"ga","value":"Irish"},
    {"key":"gv","value":"Manx"},{"key":"hu","value":"Hungarian"},{"key":"jv","value":"Javanese"},{"key":"kr","value":"Kanuri"},{"key":"km","value":"Khmer"},{"key":"ky","value":"Kirghiz"},{"key":"na","value":"Nauru"},{"key":"nr","value":"Ndebele"},{"key":"oc","value":"Occitan"},{"key":"ro","value":"Romanian"},{"key":"ru","value":"Russian"},{"key":"hy","value":"Armenian"},{"key":"ch","value":"Chamorro"},{"key":"xx","value":"No Language"},{"key":"ba","value":"Bashkir"},{"key":"gl","value":"Galician"},{"key":"io","value":"Ido"},
    {"key":"lu","value":"Luba-Katanga"},{"key":"mh","value":"Marshall"},{"key":"mg","value":"Malagasy"},{"key":"mo","value":"Moldavian"},{"key":"mn","value":"Mongolian"},{"key":"nd","value":"Ndebele"},{"key":"no","value":"Norwegian"},{"key":"pl","value":"Polish"},{"key":"sw","value":"Swahili"},{"key":"tg","value":"Tajik"},{"key":"to","value":"Tonga"},{"key":"wa","value":"Walloon"},{"key":"yi","value":"Yiddish"},{"key":"en","value":"English"},{"key":"as","value":"Assamese"},{"key":"gd","value":"Gaelic"},
    {"key":"kl","value":"Kalaallisut"},{"key":"my","value":"Burmese"},{"key":"qu","value":"Quechua"},{"key":"sn","value":"Shona"},{"key":"uk","value":"Ukrainian"},{"key":"fa","value":"Persian"},{"key":"ka","value":"Georgian"},{"key":"gu","value":"Gujarati"},{"key":"av","value":"Avaric"},{"key":"ae","value":"Avestan"},{"key":"gn","value":"Guarani"},{"key":"mt","value":"Maltese"},{"key":"ne","value":"Nepali"},{"key":"sv","value":"Swedish"},{"key":"tt","value":"Tatar"},{"key":"wo","value":"Wolof"},{"key":"cn","value":"Cantonese"},{"key":"cv","value":"Chuvash"},
    {"key":"da","value":"Danish"},{"key":"dz","value":"Dzongkha"},{"key":"ny","value":"Chichewa; Nyanja"},{"key":"rn","value":"Rundi"},{"key":"st","value":"Sotho"},{"key":"tk","value":"Turkmen"},{"key":"uz","value":"Uzbek"},{"key":"vi","value":"Vietnamese"},{"key":"el","value":"Greek"},{"key":"ca","value":"Catalan"},{"key":"cy","value":"Welsh"},{"key":"de","value":"German"},{"key":"ks","value":"Kashmiri"},{"key":"ms","value":"Malay"},{"key":"nb","value":"Norwegian Bokmål"},{"key":"rm","value":"Raeto-Romance"},{"key":"si","value":"Sinhalese"},{"key":"es","value":"Spanish"},{"key":"te","value":"Telugu"},{"key":"tw","value":"Twi"},{"key":"ps","value":"Pushto"},{"key":"bg","value":"Bulgarian"},{"key":"mk","value":"Macedonian"},
    {"key":"ik","value":"Inupiaq"},{"key":"ko","value":"Korean"},{"key":"lt","value":"Lithuanian"},{"key":"om","value":"Oromo"},{"key":"se","value":"Northern Sami"},{"key":"so","value":"Somali"},{"key":"ta","value":"Tamil"},{"key":"ur","value":"Urdu"},{"key":"am","value":"Amharic"},{"key":"bs","value":"Bosnian"},{"key":"dv","value":"Divehi"},{"key":"ay","value":"Aymara"},{"key":"bm","value":"Bambara"},{"key":"ii","value":"Yi"},{"key":"ie","value":"Interlingue"},{"key":"kv","value":"Komi"},{"key":"ku","value":"Kurdish"},{"key":"nn","value":"Norwegian Nynorsk"},{"key":"zh","value":"Mandarin"},{"key":"he","value":"Hebrew"},{"key":"ee","value":"Ewe"},{"key":"fj","value":"Fijian"},{"key":"ff","value":"Fulah"},{"key":"ht","value":"Haitian; Haitian Creole"},{"key":"hr","value":"Croatian"},{"key":"ia","value":"Interlingua"},
    {"key":"kj","value":"Kuanyama"},{"key":"lo","value":"Lao"},{"key":"lg","value":"Ganda"},{"key":"mr","value":"Marathi"},{"key":"sd","value":"Sindhi"},{"key":"be","value":"Belarusian"},{"key":"ho","value":"Hiri Motu"},{"key":"kg","value":"Kongo"},{"key":"sl","value":"Slovenian"},{"key":"yo","value":"Yoruba"}],
    genre:{
        28:"Action",
        12:"Adventure",
        16:"Animation",
        35:"Comedy",
        80:"Crime",
        99:"Documentry",
        18:"Drama",
        10751:"Family",
        14:"Fantasy",
        36:"History",
        27:"Horror",
        10402:"Music",
        9648:"Mystery",
        10749:"Romance",
        878:"Sci-Fi",
        10770:"TV Movie",
        54:"Thriller",
        10752:"War",
        37:"Western",
    }
}
export const configState = createSlice({
    name:"configState",
    initialState,
    reducers:{}
})



export const getLanguages = (state:RootState) => state.config.language
export const getGenres = (state:RootState) => state.config.genre

export default configState.reducer