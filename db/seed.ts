import { getDb } from "../api/queries/connection";
import { prayers } from "./schema";

async function seed() {
  const db = getDb();
  console.log("Seeding prayers...");

  const prayersData = [
    {
      title: "Morning Praise",
      content: "Heavenly Father, I come before You this morning with a heart full of praise. You are the Alpha and Omega, the beginning and the end. I thank You for the gift of this new day and for Your mercies that are renewed every morning. Let my life be a testament to Your greatness. Fill my heart with joy and my mouth with praise. I worship You for who You are - the Creator of heaven and earth, the King of kings, and the Lord of lords. In Jesus' name, Amen.",
      category: "Praise",
      scriptureRef: "Psalm 150:6",
      dayOfWeek: 0,
    },
    {
      title: "Evening Thanksgiving",
      content: "Lord, as the sun sets on this day, I pause to give You thanks. Thank You for Your protection, Your provision, and Your presence. Thank You for the moments of joy and even the challenges that drew me closer to You. I praise You for Your faithfulness that never fails. As I rest tonight, let my dreams be filled with thoughts of Your goodness. Amen.",
      category: "Thanksgiving",
      scriptureRef: "Psalm 92:1-2",
      dayOfWeek: 0,
    },
    {
      title: "Strength for the Week",
      content: "Dear Lord, as I begin this new week, I ask for Your strength to face whatever comes my way. When I feel weak, be my strength. When I feel overwhelmed, be my peace. Help me to do all things through Christ who strengthens me. Give me wisdom in my decisions, patience in my trials, and courage in my fears. Let Your power be made perfect in my weakness. In Jesus' name, Amen.",
      category: "Strength",
      scriptureRef: "Philippians 4:13",
      dayOfWeek: 1,
    },
    {
      title: "Courage in Challenges",
      content: "Father, I know that this week will bring its own challenges. I pray for the courage to face them head-on, knowing that You are with me. Help me not to fear, for You have not given me a spirit of fear, but of power, love, and a sound mind. When obstacles arise, remind me that I can do all things through Christ. Strengthen my hands for the work ahead. Amen.",
      category: "Strength",
      scriptureRef: "Joshua 1:9",
      dayOfWeek: 1,
    },
    {
      title: "Divine Direction",
      content: "Lord, I seek Your guidance in all my ways. Show me the path You want me to take. Illuminate my steps with Your Word. When I am confused, be my clarity. When I am uncertain, be my confidence. I acknowledge You in all my ways, trusting that You will direct my paths. Lead me beside still waters and restore my soul. In Jesus' name, Amen.",
      category: "Guidance",
      scriptureRef: "Proverbs 3:5-6",
      dayOfWeek: 2,
    },
    {
      title: "Wisdom for Decisions",
      content: "Heavenly Father, I ask for wisdom today. Your Word says that if anyone lacks wisdom, they should ask You, and You will give generously. I need Your wisdom in my decisions - big and small. Help me to see situations from Your perspective and to choose what honors You. Let Your Spirit guide me into all truth. Amen.",
      category: "Wisdom",
      scriptureRef: "James 1:5",
      dayOfWeek: 2,
    },
    {
      title: "Perfect Peace",
      content: "Prince of Peace, I come to You today seeking the peace that surpasses all understanding. In a world full of chaos and uncertainty, anchor my heart in Your peace. Guard my mind and heart in Christ Jesus. Help me to be anxious for nothing, but in everything by prayer and supplication, with thanksgiving, let my requests be made known to You. Let Your peace rule in my heart. Amen.",
      category: "Peace",
      scriptureRef: "Philippians 4:6-7",
      dayOfWeek: 3,
    },
    {
      title: "Rest in God",
      content: "Lord, teach me to rest in You. In the busyness of life, help me to find moments of stillness to hear Your voice. Remind me that You are God, and I can be still and know this truth. Cast all my anxieties upon You, because You care for me. Let me find rest for my soul in Your presence. Thank You for being my refuge and strength. Amen.",
      category: "Peace",
      scriptureRef: "Psalm 46:10",
      dayOfWeek: 3,
    },
    {
      title: "Love Like Christ",
      content: "Father, fill my heart with Your love. Teach me to love others as You have loved me - unconditionally, sacrificially, and without judgment. Help me to see people through Your eyes of compassion. Let love be the motivation behind everything I do. Remove any bitterness, anger, or resentment from my heart, and replace them with Your perfect love. In Jesus' name, Amen.",
      category: "Love",
      scriptureRef: "1 Corinthians 13:4-8",
      dayOfWeek: 4,
    },
    {
      title: "Love for Neighbors",
      content: "Lord Jesus, You said the second greatest commandment is to love my neighbor as myself. Help me to show kindness to those around me. Give me eyes to see the needs of others and a heart willing to serve. Let my actions demonstrate Your love. Help me to be a blessing to everyone I encounter today. Amen.",
      category: "Love",
      scriptureRef: "Mark 12:31",
      dayOfWeek: 4,
    },
    {
      title: "Divine Protection",
      content: "Mighty God, I thank You that You are my shield and my fortress. I pray for Your protection over my life, my family, and my loved ones. Keep us safe from harm and danger. Send Your angels to guard us in all our ways. No weapon formed against us shall prosper. I declare Psalm 91 over my life. In Jesus' name, Amen.",
      category: "Protection",
      scriptureRef: "Psalm 91:1-2",
      dayOfWeek: 5,
    },
    {
      title: "Armor of God",
      content: "Lord, I put on the full armor of God today. I take up the belt of truth, the breastplate of righteousness, the shoes of the gospel of peace, the shield of faith, the helmet of salvation, and the sword of the Spirit which is Your Word. Strengthen me to stand against the wiles of the devil. I am more than a conqueror through Christ who loves me. Amen.",
      category: "Spiritual Warfare",
      scriptureRef: "Ephesians 6:11-12",
      dayOfWeek: 5,
    },
    {
      title: "Week Reflection",
      content: "Gracious Father, as this week comes to a close, I take time to reflect on Your goodness. Thank You for the victories, the lessons, and the moments of grace. Forgive me for the times I fell short. Help me to learn from my mistakes and to grow in my walk with You. As I prepare for a new week, renew my spirit and refresh my soul. Amen.",
      category: "Reflection",
      scriptureRef: "Psalm 103:2-5",
      dayOfWeek: 6,
    },
    {
      title: "Sabbath Rest",
      content: "Lord of the Sabbath, thank You for the gift of rest. Help me to truly rest in You today - body, soul, and spirit. Let me set aside the cares of the week and simply be in Your presence. Refresh me, renew me, and restore me. Prepare me for the week ahead. Let this day be holy and set apart for You. Amen.",
      category: "Rest",
      scriptureRef: "Exodus 20:8",
      dayOfWeek: 6,
    },
  ];

  for (const prayer of prayersData) {
    await db.insert(prayers).values(prayer);
  }

  console.log("Seeded 14 prayers successfully!");
}

seed()
  .then(() => {
    console.log("Seeding complete!");
    process.exit(0);
  })
  .catch((err) => {
    console.error("Seeding error:", err);
    process.exit(1);
  });
