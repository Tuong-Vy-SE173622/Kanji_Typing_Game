export interface Vocab {
  kanji: string;
  yomikata: string;
  meaning: string;
}

export interface Part {
  partId?: number | string;
  vocabList: Vocab[];
}

export interface Lesson {
  lessonId?: number | string;
  parts: Part[];
}

export const LEVEL_N5_DATA: Lesson[] = [
  {
    lessonId: 8,
    parts: [
      {
        partId: 'A',
        vocabList: [
          { kanji: '箸', yomikata: 'はし', meaning: 'đũa' },
          { kanji: '故郷', yomikata: 'こきょう・ふるさと', meaning: 'quê, quê hương' },
          { kanji: '電車', yomikata: 'でんしゃ', meaning: 'tàu điện' },
          { kanji: '銭湯', yomikata: 'せんとう', meaning: 'nhà tắm công cộng' },
          { kanji: 'こと', yomikata: 'こと', meaning: 'việc' },
          { kanji: '楽器', yomikata: 'がっき', meaning: 'nhạc cụ' },
          {
            kanji: '新幹線',
            yomikata: 'しんかんせん',
            meaning: 'tàu shinkansen (một loại tàu siêu tốc của Nhật Bản)',
          },
          { kanji: '飛行機', yomikata: 'ひこうき', meaning: 'máy bay' },
          { kanji: 'バス', yomikata: 'バス', meaning: 'xe buýt' },
          { kanji: 'タクシー', yomikata: 'タクシー', meaning: 'xe taxi' },
          {
            kanji: 'ショッピングモール',
            yomikata: 'ショッピングモール',
            meaning: 'trung tâm thương mại',
          },
          { kanji: 'スポーツ', yomikata: 'スポーツ', meaning: 'thể thao' },
          { kanji: 'スポーツジム', yomikata: 'スポーツジム', meaning: 'phòng tập gym' },
          { kanji: 'ピアノ', yomikata: 'ピアノ', meaning: 'piano' },
          { kanji: 'ギター', yomikata: 'ギター', meaning: 'đàn ghi-ta' },
          { kanji: 'パクチー', yomikata: 'パクチー', meaning: 'rau mùi' },
          { kanji: 'カレー', yomikata: 'カレー', meaning: 'cà ri' },
          { kanji: '重い', yomikata: 'おもい', meaning: 'nặng' },
          { kanji: '色々', yomikata: 'いろいろ', meaning: 'nhiều, đa dạng (về chủng loại)' },
          { kanji: '泳ぎます', yomikata: 'およぎます', meaning: 'bơi' },
          { kanji: '（〜を）使います', yomikata: 'つかいます', meaning: 'sử dụng' },
          { kanji: '（〜を）運びます', yomikata: 'はこびます', meaning: 'vận chuyển, bê, vác' },
          { kanji: '（〜を）持ちます', yomikata: 'もちます', meaning: 'có, cầm' },
          { kanji: '（〜を）弾きます', yomikata: 'ひきます', meaning: 'đánh, chơi (nhạc cụ)' },
          { kanji: '（〜を）送ります', yomikata: 'おくります', meaning: 'gửi' },
          { kanji: '（〜を）話します', yomikata: 'はなします', meaning: 'nói chuyện' },
          {
            kanji: 'かかります',
            yomikata: 'かかります',
            meaning: 'mất, tốn (thời gian, tiền bạc)',
          },
          { kanji: 'やっぱり', yomikata: 'やっぱり', meaning: 'quả nhiên' },
          { kanji: 'いっぱい', yomikata: 'いっぱい', meaning: 'đầy' },
          {
            kanji: '色んな',
            yomikata: 'いろんな',
            meaning: 'nhiều (về chủng loại, đứng trước danh từ)',
          },
          { kanji: '〜か〜', yomikata: 'か', meaning: '〜 hoặc 〜' },
        ],
      },
      {
        partId: 'B',
        vocabList: [
          { kanji: 'みんな', yomikata: 'みんな', meaning: 'mọi người' },
          { kanji: '絵', yomikata: 'え', meaning: 'bức tranh' },
          { kanji: '歌', yomikata: 'うた', meaning: 'bài hát' },
          { kanji: '数学', yomikata: 'すうがく', meaning: 'môn toán' },
          {
            kanji: '人気',
            yomikata: 'にんき',
            meaning: 'sự yêu thích',
          },
          {
            kanji: '人気があります',
            yomikata: 'にんきがあります',
            meaning: 'được yêu thích',
          },
          { kanji: '卓球', yomikata: 'たっきゅう', meaning: 'bóng bàn' },
          { kanji: '水泳', yomikata: 'すいえい', meaning: 'bơi lội' },
          { kanji: 'バドミントン', yomikata: 'バドミントン', meaning: 'cầu lông' },
          { kanji: 'バスケットボール', yomikata: 'バスケットボール', meaning: 'bóng rổ' },
          { kanji: 'バレーボール', yomikata: 'バレーボール', meaning: 'bóng chuyền' },
          { kanji: 'ライブ', yomikata: 'ライブ', meaning: 'buổi biểu diễn trực tiếp, live show' },
          { kanji: 'カラオケ', yomikata: 'カラオケ', meaning: 'karaoke' },
          { kanji: 'ダンス', yomikata: 'ダンス', meaning: 'nhảy, nhảy múa' },
          { kanji: 'DVD', yomikata: 'ディーブイディー', meaning: 'DVD' },
          { kanji: '色', yomikata: 'いろ', meaning: 'màu, màu sắc' },
          { kanji: '何色', yomikata: 'なにいろ', meaning: 'màu gì' },
          { kanji: '赤', yomikata: 'あか', meaning: 'màu đỏ' },
          { kanji: '白', yomikata: 'しろ', meaning: 'màu trắng' },
          { kanji: '青', yomikata: 'あお', meaning: 'màu xanh' },
          { kanji: '黒', yomikata: 'くろ', meaning: 'màu đen' },
          { kanji: '黄色', yomikata: 'きいろ', meaning: 'màu vàng' },
          { kanji: '緑 (色)', yomikata: 'みどりいろ', meaning: 'màu xanh lá cây' },
          { kanji: 'ピンク (色)', yomikata: 'ピンクいろ', meaning: 'màu hồng' },
          { kanji: 'オレンジ (色)', yomikata: 'オレンジいろ', meaning: 'màu cam' },
          { kanji: '甘い', yomikata: 'あまい', meaning: 'ngọt' },
          { kanji: 'かっこいい', yomikata: 'かっこいい', meaning: 'ngầu' },
          { kanji: '近い', yomikata: 'ちかい', meaning: 'gần' },
          { kanji: '好き', yomikata: 'すき', meaning: 'thích' },
          { kanji: '大好き', yomikata: 'だいすき', meaning: 'rất thích' },
          { kanji: '嫌い', yomikata: 'きらい', meaning: 'ghét' },
          { kanji: '大嫌い', yomikata: 'だいきらい', meaning: 'rất ghét' },
          { kanji: '上手', yomikata: 'じょうず', meaning: 'giỏi' },
          { kanji: '下手', yomikata: 'へた', meaning: 'kém' },
          { kanji: '得意', yomikata: 'とくい', meaning: 'giỏi, mạnh (sở trường)' },
          { kanji: '苦手', yomikata: 'にがて', meaning: 'không giỏi, yếu, dở, (không thích, sợ)' },
          { kanji: '計算 (します)', yomikata: 'けいさん（します）', meaning: 'tính toán' },
          { kanji: '特に', yomikata: 'とくに', meaning: 'đặc biệt' },
        ],
      },
      {
        partId: 'C',
        vocabList: [
          { kanji: '父', yomikata: 'ちち', meaning: 'bố của mình' },
          {
            kanji: 'お父さん',
            yomikata: 'おとうさん',
            meaning: 'bố (khi nói về bố của người khác hoặc gọi bố mình một cách thân thiết)',
          },
          { kanji: '母', yomikata: 'はは', meaning: 'mẹ của mình' },
          {
            kanji: 'お母さん',
            yomikata: 'おかあさん',
            meaning: 'mẹ (khi nói về mẹ của người khác hoặc gọi mẹ mình một cách thân thiết)',
          },
          {
            kanji: 'お兄さん',
            yomikata: 'おにいさん',
            meaning: 'anh (khi nói về anh của người khác hoặc gọi anh mình một cách thân thiết)',
          },
          { kanji: '姉', yomikata: 'あね', meaning: 'chị gái của mình' },
          {
            kanji: 'お姉さん',
            yomikata: 'おねえさん',
            meaning: 'chị (khi nói về chị của người khác hoặc gọi chị mình một cách thân thiết)',
          },
          { kanji: '弟', yomikata: 'おとうと', meaning: 'em trai của mình' },
          { kanji: '弟さん', yomikata: 'おとうとさん', meaning: 'em trai của người khác' },
          { kanji: '祖父', yomikata: 'そふ', meaning: 'ông của mình' },
          {
            kanji: 'おじいさん',
            yomikata: 'おじいさん',
            meaning: 'ông (khi nói về ông của người khác hoặc gọi ông mình một cách thân thiết)',
          },
          { kanji: '祖母', yomikata: 'そぼ', meaning: 'bà của mình' },
          {
            kanji: 'おばあさん',
            yomikata: 'おばあさん',
            meaning: 'bà (khi nói về bà của người khác hoặc gọi bà mình một cách thân thiết)',
          },
          { kanji: '頭', yomikata: 'あたま', meaning: 'đầu' },
          { kanji: '背', yomikata: 'せ', meaning: 'lưng' },
          { kanji: '髪', yomikata: 'かみ', meaning: 'tóc' },
          { kanji: '目', yomikata: 'め', meaning: 'mắt' },
          { kanji: '鼻', yomikata: 'はな', meaning: 'mũi' },
          { kanji: '足', yomikata: 'あし', meaning: 'bàn chân' },
          { kanji: '食べ物', yomikata: 'たべもの', meaning: 'đồ ăn' },
          { kanji: '景色', yomikata: 'けしき', meaning: 'phong cảnh' },
          { kanji: '気温', yomikata: 'きおん', meaning: 'nhiệt độ (bên ngoài)' },
          { kanji: '身長', yomikata: 'しんちょう', meaning: 'chiều cao cơ thể' },
          { kanji: 'ホテル', yomikata: 'ホテル', meaning: 'khách sạn' },
          { kanji: 'ドラマ', yomikata: 'ドラマ', meaning: 'phim truyền hình' },
          { kanji: 'アニメ', yomikata: 'アニメ', meaning: 'anime' },
          { kanji: '低い', yomikata: 'ひくい', meaning: 'thấp' },
          { kanji: '長い', yomikata: 'ながい', meaning: 'dài' },
          {
            kanji: '〜センチ ',
            yomikata: '〜センチ',
            meaning: '〜 cm',
          },
          { kanji: 'どの〜', yomikata: 'どの', meaning: 'cái 〜 nào (đứng trước danh từ)' },
        ],
      },
    ],
  },
  {
    lessonId: 9,
    parts: [
      {
        partId: 'A',
        vocabList: [
          { kanji: '無料', yomikata: 'むりょう', meaning: 'miễn phí' },
          { kanji: '趣味', yomikata: 'しゅみ', meaning: 'sở thích' },
          { kanji: '夢', yomikata: 'ゆめ', meaning: 'ước mơ, giấc mơ' },
          { kanji: '日課', yomikata: 'にっか', meaning: 'thói quen hàng ngày' },
          { kanji: '日記', yomikata: 'にっき', meaning: 'nhật ký' },
          { kanji: '花', yomikata: 'はな', meaning: 'bông hoa' },
          { kanji: '切手', yomikata: 'きって', meaning: 'con tem' },
          { kanji: '自分', yomikata: 'じぶん', meaning: 'bản thân' },
          { kanji: '新聞', yomikata: 'しんぶん', meaning: 'tờ báo' },
          { kanji: '空港', yomikata: 'くうこう', meaning: 'sân bay' },
          { kanji: '飲み物', yomikata: 'のみもの', meaning: 'đồ uống' },
          { kanji: 'シャワー', yomikata: 'シャワー', meaning: 'vòi hoa sen' },
          { kanji: 'コーヒーマシン', yomikata: 'コーヒーマシン', meaning: 'máy pha cà phê' },
          { kanji: 'カフェ', yomikata: 'カフェ', meaning: 'quán cà phê' },
          { kanji: 'ゲーム', yomikata: 'ゲーム', meaning: 'game, trò chơi' },
          { kanji: 'クラシック', yomikata: 'クラシック', meaning: 'nhạc cổ điển' },
          { kanji: 'コンサート', yomikata: 'コンサート', meaning: 'buổi hòa nhạc' },
          { kanji: 'スキー', yomikata: 'スキー', meaning: 'trượt tuyết' },
          { kanji: 'シール', yomikata: 'シール', meaning: 'nhãn dán' },
          { kanji: '（〜を）描きます', yomikata: 'かきます', meaning: 'vẽ' },
          { kanji: '（〜を）書きます', yomikata: 'かきます', meaning: 'viết' },
          { kanji: '（〜を）作ります', yomikata: 'つくります', meaning: 'làm, tạo ra' },
          { kanji: '登ります', yomikata: 'のぼります', meaning: 'leo (núi)' },
          { kanji: '（〜を）片付けます', yomikata: 'かたづけます', meaning: 'sắp xếp' },
          {
            kanji: '（〜を）育てます',
            yomikata: 'そだてます',
            meaning: 'nuôi dạy, nuôi dưỡng, nuôi trồng',
          },
          { kanji: '（〜を）集めます', yomikata: 'あつめます', meaning: 'thu thập, sưu tầm' },
          { kanji: '（〜を）建てます', yomikata: 'たてます', meaning: 'xây dựng' },
          { kanji: '浴びます', yomikata: 'あびます', meaning: 'tắm' },
          { kanji: '（〜を）運転します', yomikata: 'うんてん（します）', meaning: 'lái xe' },
          { kanji: '今度', yomikata: 'こんど', meaning: 'lần tới' },
        ],
      },
    ],
  },
];

export const N5_DATA_DROPDOWN = [
  { lessionId: 8, parts: [{ partId: 'All' }, { partId: 'A' }, { partId: 'B' }, { partId: 'C' }] },
  { lessionId: 9, parts: [{ partId: 'All' }, { partId: 'A' }] },
];
