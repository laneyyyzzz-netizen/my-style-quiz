import React, { useState } from "react";

// --- 1. 类型定义 ---
type BrandKey = "minimal" | "avantGarde" | "opulent" | "classic" | "lowKey";

interface BrandConfig {
  name: string;
  title: string;
  image: string;
  desc: string;
  percentages: { label: string; value: number }[];
}

// --- 2. 结果配置 ---
const BRAND_MAP: Record<BrandKey, BrandConfig> = {
  minimal: {
    name: "C*LINE",
    title: "极简主义 | 冷静的执剑者",
    image: "/vibe-01.webp",
    desc: "在你的美学词典里，‘克制’是最高级的赞美。你迷恋留白与秩序，在嘈杂的世界中始终保持绝对的掌控感。你追求的不是引人注目，而是当人走远后，那种余味悠长的松弛与从容。",
    percentages: [{ label: "极简主义", value: 85 }, { label: "静奢内敛", value: 15 }]
  },
  avantGarde: {
    name: "BALENCI*GA",
    title: "先锋美学 | 审美的破局者",
    image: "/vibe-02.webp",
    desc: "规则对你而言只是参考。你热衷于挑战传统的视觉边界，将前卫与实用完美糅合。在你的世界里，时尚是一场关于勇气的自我表达，不被定义才是你最鲜明的标签。",
    percentages: [{ label: "先锋廊形", value: 70 }, { label: "极简主义", value: 30 }]
  },
  opulent: {
    name: "VERS*CE",
    title: "华丽美学 | 视觉的统治者",
    image: "/vibe-03.webp",
    desc: "繁复即是生命力。你从不掩饰对极致感官享受的追求，华丽的纹饰与浓郁的色彩是你的盔甲。你出现在哪里，哪里就是视觉的中心，这种生命张力本身就是一种统治力。",
    percentages: [{ label: "华丽美学", value: 80 }, { label: "匠心经典", value: 20 }]
  },
  classic: {
    name: "CHAN*L / HERM*S",
    title: "匠心经典 | 底蕴的守护者",
    image: "/vibe-04.webp",
    desc: "测出这个结果的你，骨子里有一种‘不讨好’的清冷。你钟情于经典的廓形，是因为你追求的是一种绝对的自我秩序。对你来说，真正的奢侈不是昂贵的价格，而是那种十年如一日、跨越时代的质感与定力。",
    percentages: [{ label: "匠心经典", value: 65 }, { label: "静奢内敛", value: 35 }]
  },
  lowKey: {
    name: "C*LINE / Loro Piana",
    title: "静奢格调 | 隐秘的掌权者",
    image: "/vibe-05.webp",
    desc: "真正的奢侈是无需言说的。顶级质感是你的唯一底气，你不需要 Logo 来证明身价。这种‘大音希声’的穿衣逻辑，折射出你极其强大的内核与不战而屈人之兵的优雅。",
    percentages: [{ label: "静奢内敛", value: 90 }, { label: "极简主义", value: 10 }]
  }
};

// --- 3. 20道全量题目配置 ---
const QUESTIONS = [
  { title: "1. 玩手机时，你最常...", options: [{ label: "刷理财/新闻", scores: { classic: 3 } }, { label: "看潮流/街拍", scores: { avantGarde: 3 } }, { label: "清理桌面/收纳", scores: { minimal: 3 } }, { label: "刷派对/度假vlog", scores: { opulent: 3 } }] },
  { title: "2. 你更偏爱的家居色调是？", options: [{ label: "水泥灰/冷白", scores: { minimal: 3 } }, { label: "黑金/浓郁丝绒", scores: { opulent: 3 } }, { label: "大地色/米色系", scores: { lowKey: 3 } }, { label: "胡桃木/中古感", scores: { classic: 3 } }] },
  { title: "3. 独处时，你的充电方式是？", options: [{ label: "整理房间/扔掉杂物", scores: { minimal: 3 } }, { label: "看一部实验艺术电影", scores: { avantGarde: 3 } }, { label: "阅读经典文学/社科", scores: { classic: 3 } }, { label: "做精致的下午茶并拍照", scores: { opulent: 3 } }] },
  { title: "4. 买包时，你最看重？", options: [{ label: "皮质质感与手工", scores: { lowKey: 3 } }, { label: "品牌的历史与保值", scores: { classic: 3 } }, { label: "设计的独特与张力", scores: { avantGarde: 3 } }, { label: "极简的线条与廓形", scores: { minimal: 3 } }] },
  { title: "5. 你的理想旅行地是？", options: [{ label: "安缦这类避世酒店", scores: { lowKey: 3 } }, { label: "去伦敦/巴黎看展", scores: { classic: 3 } }, { label: "去柏林蹦迪/看地下艺术", scores: { avantGarde: 3 } }, { label: "迪拜或摩纳哥度假", scores: { opulent: 3 } }] },
  { title: "6. 穿搭时，你对色彩的底线是？", options: [{ label: "身上绝不能超过3个颜色", scores: { minimal: 3 } }, { label: "必须有某种大块的高饱和色", scores: { opulent: 3 } }, { label: "全身同色系，不同深浅", scores: { lowKey: 3 } }, { label: "黑白灰是唯一的安全区", scores: { classic: 3 } }] },
  { title: "7. 朋友对你穿搭的评价通常是？", options: [{ label: "看起来很有钱但说不出品牌", scores: { lowKey: 3 } }, { label: "很有个性，普通人驾驭不了", scores: { avantGarde: 3 } }, { label: "非常得体，什么时候看都好看", scores: { classic: 3 } }, { label: "清冷、高级、有距离感", scores: { minimal: 3 } }] },
  { title: "8. 挑选香水，你更倾向？", options: [{ label: "无性别色彩的木质香", scores: { minimal: 3 } }, { label: "浓郁奢华的东方花香调", scores: { opulent: 3 } }, { label: "淡淡的皂感或体香感", scores: { lowKey: 3 } }, { label: "经典的沙龙香/皮革调", scores: { classic: 3 } }] },
  { title: "9. 你对‘快时尚’的态度是？", options: [{ label: "基本不去，只买精选单品", scores: { classic: 3 } }, { label: "会买一些基础款来搭配高级件", scores: { lowKey: 3 } }, { label: "偶尔买一些奇怪的设计玩玩", scores: { avantGarde: 3 } }, { label: "为了效率，只买大品牌全套", scores: { opulent: 3 } }] },
  { title: "10. 你如何定义‘真正的奢侈’？", options: [{ label: "时间的自由与身心的松弛", scores: { lowKey: 3 } }, { label: "极致的审美表达", scores: { avantGarde: 3 } }, { label: "秩序感带来的安全感", scores: { minimal: 3 } }, { label: "对顶级资源的掌控力", scores: { opulent: 3 } }] },
  { title: "11. 你的桌面通常是什么样的？", options: [{ label: "除了电脑什么都没有", scores: { minimal: 3 } }, { label: "摆满了潮玩和个性摆件", scores: { avantGarde: 3 } }, { label: "整洁且有很多纸质笔记本", scores: { classic: 3 } }, { label: "有昂贵的香薰和高科技产品", scores: { opulent: 3 } }] },
  { title: "12. 面对社交场合，你更倾向？", options: [{ label: "安静待在角落观察", scores: { lowKey: 3 } }, { label: "成为中心，展现自我", scores: { opulent: 3 } }, { label: "礼貌但疏离地交谈", scores: { minimal: 3 } }, { label: "寻找志同道合的‘圈内人’", scores: { classic: 3 } }] },
  { title: "13. 你的理财观念是？", options: [{ label: "极致稳健，只投保值资产", scores: { classic: 3 } }, { label: "大手大脚，为了美可以透支", scores: { opulent: 3 } }, { label: "精打细算，追求高性价比质感", scores: { minimal: 3 } }, { label: "投资在自己的认知和体验上", scores: { lowKey: 3 } }] },
  { title: "14. 穿西装时，你会搭配？", options: [{ label: "白T恤和极简球鞋", scores: { minimal: 3 } }, { label: "华丽的内搭和夸张首饰", scores: { opulent: 3 } }, { label: "真丝吊带或高级针织衫", scores: { lowKey: 3 } }, { label: "挺括的衬衫和皮鞋", scores: { classic: 3 } }] },
  { title: "15. 你眼中的‘性感’是？", options: [{ label: "大方地展示身材曲线", scores: { opulent: 3 } }, { label: "完全不露，但眼神有力", scores: { lowKey: 3 } }, { label: "清瘦带来的易碎感", scores: { minimal: 3 } }, { label: "知性与博学带来的魅力", scores: { classic: 3 } }] },
  { title: "16. 挑选照片发朋友圈，你会？", options: [{ label: "只发一张意境图，无配文", scores: { minimal: 3 } }, { label: "精修九宫格，展现精致生活", scores: { opulent: 3 } }, { label: "发一张模糊但有氛围感的抓拍", scores: { avantGarde: 3 } }, { label: "记录有意义的一本书或瞬间", scores: { classic: 3 } }] },
  { title: "17. 你对‘制服’的态度是？", options: [{ label: "喜欢那种禁欲的秩序感", scores: { classic: 3 } }, { label: "很无趣，必须通过首饰来打破", scores: { opulent: 3 } }, { label: "是省去思考时间的效率工具", scores: { minimal: 3 } }, { label: "是一种角色扮演的趣味", scores: { avantGarde: 3 } }] },
  { title: "18. 你更喜欢的运动方式？", options: [{ label: "普拉提/瑜伽这种内收的", scores: { minimal: 3 } }, { label: "网球/高尔夫这类社交型的", scores: { classic: 3 } }, { label: "马术/击剑等带点贵气的", scores: { opulent: 3 } }, { label: "徒步/独自行走这种沉浸的", scores: { lowKey: 3 } }] },
  { title: "19. 挑选餐具，你偏好？", options: [{ label: "手工捏制的、有肌理感的", scores: { lowKey: 3 } }, { label: "带金边或繁复花纹的瓷器", scores: { opulent: 3 } }, { label: "纯白无瑕的极简瓷", scores: { minimal: 3 } }, { label: "有悠久历史的传统品牌", scores: { classic: 3 } }] },
  { title: "20. 假如明天是世界末日？", options: [{ label: "依然优雅地整理好床铺", scores: { minimal: 3 } }, { label: "举办最后一场狂欢派对", scores: { opulent: 3 } }, { label: "回家陪父母，回归初心", scores: { lowKey: 3 } }, { label: "静静看完手里的那本书", scores: { classic: 3 } }] }
];

const QuizApp: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [scores, setScores] = useState<Record<BrandKey, number>>({
    classic: 0, avantGarde: 0, minimal: 0, opulent: 0, lowKey: 0
  });
  const [isFinished, setIsFinished] = useState(false);

  const handleSelect = (optionScores: Partial<Record<BrandKey, number>>) => {
    const nextScores = { ...scores };
    (Object.keys(optionScores) as BrandKey[]).forEach(key => {
      nextScores[key] = (nextScores[key] || 0) + (optionScores[key] || 0);
    });
    setScores(nextScores);
    if (currentIndex < QUESTIONS.length - 1) setCurrentIndex(currentIndex + 1);
    else setIsFinished(true);
  };

  const containerStyle: React.CSSProperties = {
    minHeight: "100vh", backgroundColor: "#F2F2F2", display: "flex", flexDirection: "column",
    alignItems: "center", justifyContent: "center", padding: "20px", fontFamily: "sans-serif"
  };

  const cardStyle: React.CSSProperties = {
    maxWidth: "420px", width: "100%", backgroundColor: "white", borderRadius: "45px",
    padding: "45px", boxShadow: "0 10px 40px rgba(0,0,0,0.05)", display: "flex", flexDirection: "column"
  };

  if (isFinished) {
    const sorted = Object.entries(scores).sort(([, a], [, b]) => b - a);
    const topKey = sorted[0][0] as BrandKey;
    const result = BRAND_MAP[topKey] || BRAND_MAP.minimal;

    return (
      <div style={containerStyle}>
        <div style={{...cardStyle, padding: "35px"}}>
          <p style={{fontSize: "10px", color: "#ccc", textAlign: "center", letterSpacing: "2px", marginBottom: "12px", textTransform: "uppercase"}}>Aesthetic DNA Result</p>
          <h1 style={{fontSize: "26px", textAlign: "center", margin: "0 0 8px 0", fontWeight: 500}}>{result.name}</h1>
          <p style={{fontSize: "12px", color: "#cc9966", textAlign: "center", marginBottom: "25px"}}>{result.title}</p>
          <div style={{width: "65%", margin: "0 auto 25px auto", aspectRatio: "1/1.2", borderRadius: "25px", overflow: "hidden", border: "1px solid #f9f9f9"}}>
            <img src={result.image} style={{width: "100%", height: "100%", objectFit: "cover"}} alt="result" />
          </div>
          <p style={{fontSize: "14px", color: "#666", lineHeight: "1.8", marginBottom: "30px", textAlign: "justify", padding: "0 5px"}}>{result.desc}</p>
          <div style={{marginBottom: "35px"}}>
            {result.percentages.map((item, idx) => (
              <div key={idx} style={{display: "flex", alignItems: "center", marginBottom: "12px", fontSize: "11px", color: "#999"}}>
                <span style={{width: "60px"}}>{item.label}</span>
                <div style={{flex: 1, height: "1px", backgroundColor: "#eee", margin: "0 15px", position: "relative"}}>
                  <div style={{position: "absolute", left: 0, top: "-0.5px", height: "2px", backgroundColor: "#333", width: `${item.value}%`}} />
                </div>
                <span style={{width: "30px", textAlign: "right", color: "#333", fontWeight: "bold"}}>{item.value}%</span>
              </div>
            ))}
          </div>
          <button onClick={() => window.location.reload()} style={{width: "100%", padding: "18px", backgroundColor: "#1a1a1a", color: "#fff", borderRadius: "100px", border: "none", fontSize: "12px", cursor: "pointer", letterSpacing: "1px", marginBottom: "20px"}}>RESTART TEST / 重新测试</button>
          <div style={{textAlign: "center", color: "#d9d9d9", fontSize: "10px", lineHeight: "1.6", padding: "0 10px"}}>
            本内容为基于美学逻辑的趣味探索<br />与文中提及品牌无官方商业关联，仅供风格参考。
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <div style={{...cardStyle, minHeight: "680px", justifyContent: "space-between"}}>
        <div style={{display: "flex", justifyContent: "space-between", fontSize: "11px", color: "#ccc", letterSpacing: "1.5px"}}>
          <span>ESTHETIC LAB</span>
          <span>{currentIndex + 1} / {QUESTIONS.length}</span>
        </div>
        <div style={{margin: "40px 0 20px 0"}}>
          <h2 style={{fontSize: "26px", fontWeight: 400, color: "#111", lineHeight: "1.4", textAlign: "left"}}>{QUESTIONS[currentIndex].title}</h2>
        </div>
        <div style={{display: "flex", flexDirection: "column", gap: "18px", flex: 1, justifyContent: "center"}}>
          {QUESTIONS[currentIndex].options.map((opt, i) => (
            <button key={i} onClick={() => handleSelect(opt.scores)} style={{width: "100%", textAlign: "left", padding: "26px 30px", borderRadius: "25px", border: "1px solid #f2f2f2", backgroundColor: "#fff", color: "#444", fontSize: "16px", cursor: "pointer", transition: "all 0.2s ease"}}>{opt.label}</button>
          ))}
        </div>
        <div style={{height: "20px"}}></div>
      </div>
    </div>
  );
};

export default QuizApp;