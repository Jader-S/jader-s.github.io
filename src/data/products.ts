export type ProductSpec = { label: string; value: string }

export type ProductSection = { title: string; body: string[] }

export type ProductItem = {
  id: string
  title: string
  description: string
  image?: string
  gallery?: string[]
  highlights?: string[]
  specs?: ProductSpec[]
  sections?: ProductSection[]
}

export type ProductGroup = {
  id: 'nfc' | 'concentrate' | 'puress' | 'clarified' | 'pulp' | 'essential-oils'
  title: string
  summary: string
  heroImage: string
  slogan?: string
  items: ProductItem[]
}

export const productGroups: ProductGroup[] = [
  {
    id: 'nfc',
    title: 'NFC Juices',
    summary:
      'Freshly pressed juices that preserve natural pulp, vibrant color, and authentic citrus flavor. Ideal for premium beverages seeking unprocessed sensory profiles.',
    heroImage: '1-NFC Juices.png',
    slogan: '/ Taste the difference. Feel the health. /',
    items: [
      {
        id: 'lemon-nfc',
        title: 'Lemon NFC',
        image: 'nfc/lemon.png',
        description:
          'Our lemon juice stands out for its vibrant yellow color, occasionally displaying slightly brownish hues — a natural indicator of fully ripened lemons. A juice that appears too pale or dull brown may suggest overripe fruit and is generally less desirable in terms of quality. Our lemon juice typically contains centrifugable pulp between 6–9%, consistent with standard citrus profiles. For applications requiring a smoother texture, we can offer selected batches with reduced pulp levels (around 2%), though this may slightly affect the natural organoleptic profile of the juice. Lemon juice is widely used as a natural acidifier and serves as a key base ingredient in the production of lemonades, ice creams, and frozen desserts.',
        specs: [
          { label: 'Brix', value: 'Max. 7' },
          { label: 'Acidity', value: '4.5 – 6.0' },
        ],
      },
      {
        id: 'orange-nfc',
        title: 'Orange NFC',
        image: 'nfc/orange.png',
        description:
          'Our orange juice is known for its natural range of colors—from bright yellow-orange hues to deeper orange tones with slight brownish accents, reflecting the natural ripeness of the fruit. Juices that appear too pale or dull may indicate less desirable fruit quality. Our orange juice varies in acidity depending on the natural sugar-to-acid ratio of the fruit. Oranges with lower ratios produce a tangier, more acidic juice, while those with higher ratios yield a sweeter, mellow flavor profile. Consumer preferences differ across markets, and we tailor our offerings to meet the demand for either refreshing acidity or balanced sweetness.',
        specs: [
          { label: 'Brix', value: '10–12' },
          { label: 'Ratio', value: '12–16' },
          { label: 'Color', value: 'OJ3 – OJ5' },
        ],
      },
      {
        id: 'apple-nfc',
        title: 'Apple NFC',
        image: 'nfc/apple.png',
        description:
          'We offer two main qualities of freshly pressed apple juice to meet diverse market preferences: Cloudy Apple Juice and Clarified Apple Juice. Immediately after pressing, apple juice is naturally cloudy, containing suspended pulp particles that give the juice its characteristic texture and fresh flavor. This is our cloudy apple juice, valued for its natural body and wholesome profile. For applications requiring a smoother, clearer product, we apply a gentle clarification process—typically ultrafiltration—that removes suspended solids and pulp, resulting in a bright, transparent juice known as clarified apple juice. Both styles retain the authentic freshness and delicate sweetness of carefully selected apples, allowing us to cater to a wide range of consumer tastes and product applications.',
        sections: [
          {
            title: 'Cloudy Apple Juice',
            body: [
              'Immediately after pressing, apple juice is naturally cloudy, containing suspended pulp particles that give the juice its characteristic texture and fresh flavor.',
            ],
          },
          {
            title: 'Clarified Apple Juice',
            body: [
              'For applications requiring a smoother, clearer product, we apply a gentle clarification process—typically ultrafiltration—that removes suspended solids and pulp, resulting in a bright, transparent juice.',
            ],
          },
        ],
      },
      {
        id: 'pomegranate-nfc',
        title: 'Pomegranate NFC',
        image: 'nfc/pomegranate.png',
        description:
          "Our pomegranate juice is recognized for its deep red color, ranging from intense ruby hues to lighter shades. This rich red color comes from anthocyanins—natural pigments that are delicate and prone to rapid browning. For this reason, proper storage under freezing or refrigeration is essential to preserve the juice's vibrant color and quality. It's important to highlight that cloudy pomegranate juice retains the full spectrum of health-benefiting compounds naturally present in the fruit, many of which are lost during clarification. This makes clarified concentrate a preferred choice over clarified juice for many manufacturing applications, ensuring nutritional value and authentic flavor.",
        specs: [
          { label: 'Brix', value: '14–20' },
          { label: 'pH', value: '2.0 – 4.4' },
        ],
      },
      {
        id: 'grapefruit-nfc',
        title: 'Pink Grapefruit NFC',
        image: 'nfc/grapefruit.png',
        description:
          'Grapefruit juice has long been celebrated for its association with a healthy lifestyle and balanced nutrition. Our pink grapefruit juice offers a range of natural health benefits, making it a popular choice for consumers seeking both flavor and wellness.',
        sections: [
          {
            title: 'Key Benefits',
            body: [
              'Rich Source of Vitamin C: Packed with this essential antioxidant, our grapefruit juice helps protect cells from oxidative damage and supports overall immune health.',
              'Supports Digestion: Naturally occurring digestive enzymes in the juice aid digestion and help reduce inflammation.',
              'Promotes Healthy Skin: The abundant vitamin C content contributes to collagen production, supporting skin elasticity and health.',
              'May Reduce Risk of Chronic Diseases: Flavonoids and carotenoids present in the juice have been linked to lowering the risk of chronic conditions such as heart disease and certain cancers.',
              'Aids Weight Management: By helping curb appetite and promoting a feeling of fullness, grapefruit juice can be a valuable part of a weight management plan.',
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'concentrate',
    title: 'Concentrated Juices',
    summary:
      'High Brix concentrates engineered through evaporation and clarification techniques for versatile industrial applications—from beverages to desserts.',
    heroImage: '2-Concentrated Juices.png',
    items: [
      {
        id: 'lemon-concentrate',
        title: 'Lemon Juice Concentrate',
        image: 'concentrate/lemon.png',
        description:
          'Produced by evaporating fresh lemon juice and offered in cloudy or clear types. Qualities are defined by citric acid content (GPL) and concentration level.',
        sections: [
          {
            title: 'Cloudy Type',
            body: [
              'Our lemon juice concentrate is made by evaporating freshly squeezed lemon juice to achieve the desired concentration, providing a high-quality product that meets diverse customer needs. From a processing perspective, we offer two main qualities based on the natural citric acid content and concentration level of the lemon juice:',
            ],
          },
          {
            title: 'Technical Specifications',
            body: [
              '400 GPL Quality — Brix: 45–53 | Acidity: 30–33 | Citric Acid (GPL): 390–415',
              '500 GPL Quality — Brix: 47–59 | Acidity: 37.0–40.5 | Citric Acid (GPL): 490–515',
            ],
          },
          {
            title: 'Clear Type',
            body: [
              'The clarification of lemon juice concentrate is mainly carried out through two methods: enzymatic clarification and ultrafiltration clarification.',
            ],
          },
          {
            title: 'Enzymatic Clarification',
            body: [
              'This process begins by diluting the lemon juice concentrate, followed by the addition of specific enzymes. These enzymes break down the substances responsible for the turbidity, causing them to settle. The clarified juice is obtained by carefully removing this settled material through decantation.',
            ],
          },
          {
            title: 'Ultrafiltration Clarification',
            body: [
              'A mechanical process where the diluted concentrate is passed through a series of fine membranes that effectively remove pulp and suspended particles, resulting in a clear and bright juice. It is important to highlight that clarification mainly affects the natural color of the product, which becomes lighter, but the citric acid content (GPL) characteristic of each quality grade remains unchanged. In both cases, the juice must be reconcentrated after clarification to produce the final clarified lemon juice concentrate.',
            ],
          },
        ],
        specs: [
          { label: '400 GPL Brix', value: '45 – 53' },
          { label: '400 GPL Acidity', value: '30 – 33' },
          { label: '400 GPL Citric Acid', value: '390 – 415 GPL' },
          { label: '500 GPL Brix', value: '47 – 59' },
          { label: '500 GPL Acidity', value: '37 – 40.5' },
          { label: '500 GPL Citric Acid', value: '490 – 515 GPL' },
        ],
      },
      {
        id: 'orange-concentrate',
        title: 'Orange Juice Concentrate',
        image: 'concentrate/orange-juice.png',
        description:
          "Our orange juice concentrate is produced by evaporating freshly squeezed juice from oranges carefully cultivated in Spain. The juice typically exhibits a bright, slightly pale orange color, which can vary toward deeper orange hues depending on the fruit's quality and ripeness. Regarding pulp content, centrifugable pulp in diluted juice usually ranges between 6% and 9%, consistent with other citrus juices. We also offer selected batches with reduced pulp levels close to 2%. While this lower-pulp juice is less natural from an organoleptic perspective, it is ideal for applications requiring minimal pulp but not necessarily fully clarified juice. Our orange juice concentrate is mainly used for producing FC (from concentrate) juices or as an ingredient in ice creams, bakery products, and beverages.",
        sections: [
          {
            title: 'Types',
            body: [
              'We provide two main types of orange juice concentrate:',
              'Cloudy Concentrate: Retains natural turbidity and pulp content, delivering a fuller, more authentic orange flavor.',
              'Clear Concentrate: A clarified product with reduced turbidity, suitable for applications requiring clarity without pulp.',
              'Both types share similar technical characteristics in terms of Brix, acidity, and ratio.',
            ],
          },
        ],
        specs: [
          { label: 'Brix', value: '65 – 67' },
          { label: 'Acidity', value: '2.6 – 5.1' },
          { label: 'Ratio', value: '13 – 26' },
        ],
      },
      {
        id: 'mandarin-concentrate',
        title: 'Mandarin Juice Concentrate',
        image: 'concentrate/mandarin.png',
        description:
          'The industrial production of mandarin juice concentrate focuses on carefully extracting juice from ripe mandarins and then removing excess water to deliver a highly concentrated product, typically reaching 60° Brix.',
        sections: [
          {
            title: 'Production Process',
            body: [
              'The production process follows these key steps:',
              'Selection and Washing of Mandarins: Only mature, high-quality mandarins are selected. The fruit is thoroughly washed to remove impurities and residues, ensuring a clean starting material.',
              'Juice Extraction: The mandarins undergo mechanical pressing or juicing to efficiently separate juice from pulp and seeds, obtaining fresh mandarin juice.',
              'Juice Clarification: Extracted juice may contain pulp, seeds, and other particles. A clarification process removes these impurities to produce a cleaner juice base.',
              "Concentration: Clarified juice is concentrated by reducing water content, typically through vacuum evaporation. This gentle heating method evaporates water without compromising the juice's natural flavor and aroma.",
              "Cooling: After concentration, the product is rapidly cooled to halt processing and preserve the concentrate's quality and freshness.",
              'Packaging and Storage: The mandarin concentrate is packaged and stored under controlled conditions to ensure stability, freshness, and color preservation.',
              'It is important to note that the quality of the mandarin concentrate depends significantly on the fruit variety and quality, as well as the precision of each production step. Additionally, some producers may add ascorbic acid (vitamin C) to help maintain freshness and color stability.',
            ],
          },
        ],
        specs: [
          { label: 'Brix', value: '58 – 62' },
          { label: 'Acidity', value: '3.5 – 4.5' },
          { label: 'pH', value: '2.8 - 4.2' },
        ],
      },
      {
        id: 'white-grape-concentrate',
        title: 'White Grape Juice Concentrate',
        image: 'concentrate/white-grape.png',
        description:
          'Our white grape juice concentrate boasts a vibrant golden-yellow color with a fresh, fruity flavor profile. To produce ready-to-drink juice, the concentrate is simply diluted with water to 16°Brix. Our concentrated musts are clarified, resulting in very low centrifugable pulp content—making them ideal for producing pure juices, multi-fruit blends, or white wines. We offer white grape must concentrate in various concentrations to meet the diverse needs of our customers. The key parameters that vary by quality include Brix, acidity, and transmittance. The most widely produced Brix level is 68°, which is traditionally considered the most stable concentration. Concentrations above 68°Brix may lead to natural sugar crystallization, which can be easily resolved by gentle heating and agitation.',
        specs: [
          { label: 'Brix', value: '67 - 69' },
          { label: 'pH', value: 'Max. 4.0' },
          { label: 'SO₂', value: '<30 ppm' },
        ],
      },
      {
        id: 'red-grape-concentrate',
        title: 'Red Grape Juice Concentrate',
        image: 'concentrate/red-grape.png',
        description:
          'Our red grape juice concentrates are carefully crafted to deliver rich, dark purple hues with varying intensity to suit different customer needs. We offer three primary color grades measured in color points: 300, 600, and 800. This range allows precise selection based on the desired color depth and final application. Another key factor is sulfur dioxide (SO₂) content. For markets requiring zero SO₂, we produce musts directly at harvest, ensuring the highest natural quality while meeting strict regulations. To prepare red grape juice, the concentrate is diluted with water to 16° Brix (one part concentrate to four parts water), yielding a pure, authentic juice ideal for single-varietal juices, multi-fruit blends, or even red wine production. We produce red grape must concentrates at 68° Brix to meet diverse customer requirements. This level is widely used due to its stability. Concentrations above 68° Brix may lead to natural sugar crystallization, which disappears upon gentle heating and agitation. The main quality parameters include Brix, acidity, and color points—allowing us to adapt our products to a wide range of applications in the beverage and food industries.',
        specs: [
          { label: 'Brix', value: '67 - 69' },
          { label: 'pH', value: 'Max 4.0' },
          { label: 'SO₂', value: '< 10 ppm' },
        ],
      },
      {
        id: 'pomegranate-concentrate',
        title: 'Pomegranate Juice Concentrate',
        image: 'concentrate/pomegranate.png',
        description:
          'We offer two main qualities of natural pomegranate juice: cloudy and clarified concentrates. Clarified pomegranate juice concentrates undergo a prior industrial process to remove all suspended particles before concentration. While this results in a clearer and more visually appealing juice, it is important to highlight that most of the beneficial properties of pomegranate reside precisely in these suspended elements that give the juice its natural turbidity. Their removal means that, although the juice is clearer, a significant portion of the health benefits are lost. Cloudy juice concentrate is mainly used for producing high-quality juices and, in some cases, jellies as well. We utilize the whole fruit in our production process, blending different parts of the pomegranate to offer various quality levels tailored to customer needs. The concentrate should exhibit a vibrant red color, varying to deeper hues depending on fruit quality and ripeness. Centrifugable pulp in diluted beverages typically ranges between 6–9% for cloudy concentrates, and around 2% for clarified (clear) concentrates. Our pomegranate concentrate is primarily used for refreshing beverages, jellies, ice cream, bakery products, and any application where authentic pomegranate flavor is desired.',
        specs: [
          { label: 'Brix', value: '64 – 66' },
          { label: 'Acidity', value: '4.4 – 5.4' },
          { label: 'pH', value: 'Max.4' },
        ],
      },
      {
        id: 'apple-concentrate',
        title: 'Apple Juice Concentrate',
        image: 'concentrate/apple-juice.png',
        description:
          'Our apple juice concentrate naturally exhibits a balanced and moderate acidity, resulting in a smooth and harmonious flavor profile. This characteristic facilitates seamless blending to achieve the desired acidity levels without any harshness, making our apple concentrates an ideal choice for a wide variety of applications.',
        specs: [
          { label: 'Brix', value: '69 - 71' },
          { label: 'Acidity', value: '2.2 – 2.8' },
        ],
      },
      {
        id: 'pear-concentrate',
        title: 'Pear Juice Concentrate',
        image: 'concentrate/pear.png',
        description:
          'Our pear juice concentrate is expertly produced at 70° Brix, resulting in a rich, syrup-like texture and a naturally sweet, delicate flavor. This high level of concentration offers exceptional versatility, making it suitable for a wide array of industrial applications. Primarily used in the beverage sector, the concentrate is typically reconstituted to approximately 12° Brix, delivering a smooth, refreshing final product. Its clean, neutral color and consistent texture also make it an ideal base for syrups, fruit fillings, desserts, and dairy formulations. With its mild and well-balanced flavor profile, pear concentrate integrates effortlessly into complex recipes without masking other ingredients.',
        specs: [{ label: 'Brix', value: '69 - 71' }],
      },
      {
        id: 'white-grapefruit-concentrate',
        title: 'White Grapefruit Juice Concentrate',
        image: 'concentrate/white-grapefruit.png',
        description:
          'Our white grapefruit juice concentrate is known for its refreshing sweet and slightly bitter taste, it offers a unique flavor profile that works well in a variety of applications. Naturally rich in vitamin C and antioxidants, it is an excellent choice for beverages focused on wellness and energy. Its low calorie content and clean taste make it ideal for breakfast drinks, functional beverages, and diet-friendly formulations.',
        specs: [{ label: 'Brix', value: '53 - 55' }],
      },
      {
        id: 'red-grapefruit-concentrate',
        title: 'Red / Pink Grapefruit Juice Concentrate',
        image: 'concentrate/red-grapefruit.png',
        description:
          "Our red and pink grapefruit juice concentrates are crafted by concentrating the juice extracted from select grapefruit varieties. The main difference between the two lies in the type of fruit used—red grapefruit contains higher levels of natural pigments such as lycopene, resulting in a more intense color. Both concentrates retain the fruit's natural sugars and characteristic citrus flavor. These products are ideal for use in a wide range of beverage applications and are typically reconstituted by blending one part concentrate with four to five parts water, depending on the desired flavor intensity.",
        specs: [{ label: 'Brix', value: '53 - 55' }],
      },
      {
        id: 'peach-concentrate',
        title: 'Peach Juice Concentrate',
        image: 'concentrate/base-concentrate.png',
        description:
          'Our peach Juice Concentrate is carefully produced to capture the natural sweetness and delicate aroma characteristic of ripe peaches. This concentrate retains the authentic flavor and vibrant color of fresh peaches, making it an excellent ingredient for a wide range of beverage and food applications. Typically concentrated to around 65° Brix, our peach juice concentrate offers a smooth, rich texture that reconstitutes easily into a refreshing juice when diluted with water. Its balanced sweetness and subtle fruity notes make it ideal for pure peach juices, multi-fruit blends, nectars, and even as a natural flavor enhancer in desserts and dairy products. Industrial applications benefit from its consistent quality and ease of use, with different packaging options available to suit production needs. The concentrate maintains low pulp content, ensuring clarity and stability in the final product. Produced without additives and under strict quality controls, our peach juice concentrate delivers the true essence of peaches, supporting both taste and nutritional value in your final products.',
        specs: [
          { label: 'Brix', value: '63 - 68' },
        ],
      },
      {
        id: 'pineapple-concentrate',
        title: 'Pineapple Juice Concentrate',
        image: 'concentrate/pineapple.png',
        description:
          "Our pineapple juice concentrate is a highly valued ingredient in the food and beverage industry, prized for its versatility and naturally sweet, tropical flavor. Produced from carefully selected, ripe pineapples, the juice is extracted and then concentrated through gentle evaporation to remove water, preserving the fruit's vibrant taste and nutritional qualities. This juice concentrate is widely used in the manufacturing of juices, soft drinks, energy beverages, desserts, and various other food products. Its bright, yellow color—ranging from light to deeper golden hues depending on the fruit's maturity—adds visual appeal as well as flavor depth to finished products. Our pineapple juice concentrate is typically with centrifugable pulp content in diluted juice ranging between 6% and 9%, ensuring a smooth texture ideal for diverse applications. It is especially popular as a key ingredient in beverages, energy drinks, ice creams, pastries, and dairy desserts.",
        specs: [
          { label: 'Brix', value: '59 - 61' },
          { label: 'Acidity', value: '1.5 - 4' },
        ],
      },
      {
        id: 'strawberry-concentrate',
        title: 'Strawberry Juice Concentrate',
        image: 'concentrate/strawberry.png',
        description:
          'Our strawberry juice concentrate features an intense dark red color with subtle violet hues, accompanied by a thick and viscous consistency that ensures easy blending in various applications. Being fully water-soluble, it integrates seamlessly into a wide range of formulations. Typically clarified, the centrifugable pulp content in diluted juice remains below 6%, consistent with most high-quality concentrates. This versatile concentrate is primarily used as a key ingredient in jams, ice creams, pastries, dairy desserts, and confectionery products. It can be diluted directly to create flavorful beverages or used pure to enhance the taste of ice cream and other desserts.',
        specs: [
          { label: 'Brix', value: '60 – 65' },
          { label: 'Acidity', value: '1.2 – 1.8' },
        ],
      },
    ],
  },
  {
    id: 'puress',
    title: 'Puress',
    summary:
      'Pure, natural juices processed with minimal intervention to preserve authentic flavor profiles and nutritional integrity.',
    heroImage: '3-Puress.png',
    items: [],
  },
  {
    id: 'clarified',
    title: 'Clarified Juices',
    summary:
      'Crystal-clear juices processed through advanced clarification techniques, delivering bright transparency and smooth texture for premium applications.',
    heroImage: '4-Clarified Juices.png',
    items: [],
  },
  {
    id: 'pulp',
    title: 'Pulp Cells',
    summary:
      'Premium citrus cells recovered from NFC production lines to enhance texture, mouthfeel, and authenticity in fruit-forward applications.',
    heroImage: '5-Pulp Cells.png',
    items: [
      {
        id: 'orange-cells',
        title: 'Orange Cells',
        image: 'pulp/orange.png',
        description:
          'Our orange pulp is exclusively sourced from the cells recovered during the orange juice extraction process. The recovery of the orange pulp typically occurs through two methods: directly from the production line or via centrifugation to remove seeds, black spots, and fiber bundles. This pulp retains the natural freshness and texture of oranges, making it ideal for use in juice blends, beverages, and other food products requiring high-quality fruit content.',
        specs: [
          { label: 'Brix', value: '11 – 13.8' },
          { label: 'pH', value: '3.2 – 4.0' },
          { label: 'Acidity', value: '0.5 – 1.2' },
        ],
      },
      {
        id: 'lemon-cells',
        title: 'Lemon Cells',
        image: 'pulp/lemon.png',
        description:
          'Our lemon pulp is made from the Citrus limon variety and is widely used in lemon juice production or as an additive in other products requiring a clean lemon texture and extra fruit body. As a standard practice, the lemon pulp is pasteurized and packed aseptically in 200 kg net drums to ensure maximum freshness and safety. This lemon pulp delivers authentic citrus flavor and texture, making it an ideal ingredient for a variety of beverage and food applications.',
        specs: [
          { label: 'Brix', value: 'Min. 6.5' },
          { label: 'pH', value: 'Max. 3.0' },
          { label: 'Acidity', value: '3.6 – 6.5' },
        ],
      },
      {
        id: 'mandarin-cells',
        title: 'Mandarin Cells',
        image: 'pulp/mandarin.png',
        description:
          'Our mandarin pulp is made from the Citrus reticulata variety and is primarily used in the production of natural mandarin juice. It provides authentic fruit texture and enhances the body of the juice. This mandarin pulp is an excellent ingredient for delivering natural flavor and consistency in juice manufacturing.',
        specs: [
          { label: 'Brix', value: '8 – 15.5' },
          { label: 'pH', value: '3.3 – 4.0' },
          { label: 'Acidity', value: '0.38 – 1.2' },
        ],
      },
      {
        id: 'grapefruit-cells',
        title: 'Grapefruit Cells',
        image: 'pulp/grapefruit.png',
        description:
          'Our grapefruit pulp is made from the Citrus paradisi variety. Like other citrus pulps, its primary use is to enhance NFC (Not From Concentrate) juices, improving texture and overall juice quality. This pulp is an ideal ingredient to boost the natural character and mouthfeel of grapefruit juices.',
        specs: [
          { label: 'Brix', value: '10 – 13.8' },
          { label: 'pH', value: 'Max. 4.0' },
          { label: 'Acidity', value: '0.5 – 1.2' },
        ],
      },
    ],
  },
  {
    id: 'essential-oils',
    title: 'Essential Oils',
    summary:
      'Premium citrus essential oils extracted from fruit peels, delivering concentrated aromas and flavors for beverage, food, and fragrance applications.',
    heroImage: '6-Essential Oils.png',
    items: [],
  },
]


