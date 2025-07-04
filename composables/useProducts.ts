// composable for fetching dummy products
// composables/useProducts.js
export const useProducts = () => {
  const products = ref([
    {
      id: 1,
      title: "گل رز سرخ (Gol-e Roz-e Sorkh)",
      description: "گل رز سرخ زیبا و معطر، نماد عشق و محبت. این گل با رنگ سرخ زیبا و عطر دلنشین، برای هدیه دادن و تزئین منزل عالی است.",
      image: "https://www.golemoon.com/wp-content/uploads/2023/08/1-2.jpg",
      price: "25.99"
    },
    {
      id: 2,
      title: "گل لاله (Gol-e Laleh)",
      description: "گل لاله رنگارنگ بهاری، نماد تجدد و امید. این گل با رنگ‌های شاد و زیبا، فضای خانه را شاداب و پر از انرژی می‌کند.",
      image: "https://www.golemoon.com/wp-content/uploads/2023/08/2-2.jpg",
      price: "18.99"
    },
    {
      id: 3,
      title: "گل یاس (Gol-e Yas)",
      description: "گل یاس سفید و معطر، نماد پاکی و صفا. این گل با عطر بی‌نظیر و زیبایی خاص، برای مراسم خاص و تزئین باغ مناسب است.",
      image: "https://www.golemoon.com/wp-content/uploads/2023/09/1-2.jpg",
      price: "22.99"
    },
    {
      id: 4,
      title: "گل نرگس (Gol-e Narges)",
      description: "گل نرگس زرد و زیبا، نماد خوش‌بختی و شادی. این گل با رنگ زرد درخشان و شکل منحصر به فرد، نوید بهار را می‌آورد.",
      image: "https://www.golemoon.com/wp-content/uploads/2023/09/2-2.jpg",
      price: "20.99"
    },
    {
      id: 5,
      title: "گل سنبل (Gol-e Sonbol)",
      description: "گل سنبل بنفش و معطر، نماد وفاداری و استقامت. این گل با رنگ بنفش جذاب و عطر قوی، در بهار شکوفا می‌شود.",
      image: "https://www.golemoon.com/wp-content/uploads/2023/07/1-2.jpg",
      price: "24.99"
    },
    {
      id: 6,
      title: "گل بنفشه (Gol-e Banafshe)",
      description: "گل بنفشه کوچک و نازک، نماد تواضع و فروتنی. این گل ظریف با رنگ بنفش ملایم، زیبایی خاصی به باغ می‌بخشد.",
      image: "https://www.golemoon.com/wp-content/uploads/2023/07/2-2.jpg",
      price: "15.99"
    },
    {
      id: 7,
      title: "گل آفتابگردان (Gol-e Aftabgardan)",
      description: "گل آفتابگردان بزرگ و زرد، نماد شادی و انرژی. این گل با اندازه بزرگ و رنگ زرد پر جنب و جوش، همیشه رو به خورشید است.",
      image: "https://www.golemoon.com/wp-content/uploads/2023/09/1-2.jpg",
      price: "12.99"
    },
    {
      id: 8,
      title: "گل میخک (Gol-e Mikhak)",
      description: "گل میخک صورتی و معطر، نماد عشق مادری و احترام. این گل با رنگ صورتی ملایم و عطر دلنشین، برای هدیه دادن مناسب است.",
      image: "https://www.golemoon.com/wp-content/uploads/2023/08/1-2.jpg",
      price: "19.99"
    }
  ])

  // Get all products
  const getAllProducts = () => {
    return products.value
  }



  return {
    products: readonly(products),
    getAllProducts,
  }
}