import { useState, useMemo, ChangeEvent } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MobileNavigation } from "@/components/MobileNavigation";
import { Eye, Heart, Share2, Calendar, ArrowLeft, TrendingUp, Users, BookOpen, Download, Filter, ArrowDownWideNarrow } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

interface SharedRecipe {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  createdAt: string;
  views: number;
  likes: number;
  shares: number;
  used: number;
  category: string;
  difficulty: string;
  cookingTime: number;
}

// Reusable StatCard Component
const StatCard = ({ icon: Icon, label, value, colorClass }: { icon: React.ElementType; label: string; value: string | number; colorClass: string }) => (
  <Card className="hover:shadow-lg transition-shadow">
    <CardContent className="p-4 text-center">
      <Icon className={`mx-auto mb-2 ${colorClass}`} size={24} />
      <p className="text-sm text-gray-600">{label}</p>
      <p className="text-2xl font-bold text-gray-800">{value}</p>
    </CardContent>
  </Card>
);

// Reusable RecipeTile Component (with image fallback)
const RecipeTile = ({ recipe }: { recipe: SharedRecipe }) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const [imageError, setImageError] = useState(false);

  return (
    <Card className="hover:shadow-md transition-shadow flex flex-col">
      <CardContent className="p-6 flex flex-col md:flex-row gap-4 flex-grow">
        <div className="w-full md:w-32 h-32 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
          {!imageError && recipe.imageUrl && recipe.imageUrl !== "/placeholder.svg" ? (
            <img
              src={recipe.imageUrl}
              alt={recipe.title}
              className="w-full h-full object-cover rounded-lg"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-200">
              <span className="text-4xl text-gray-500">🍽️</span>
            </div>
          )}
        </div>

        <div className="flex-1 flex flex-col">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-3">
            <div>
              <h3 className="text-lg font-semibold mb-1 text-gray-800">{recipe.title}</h3>
              <p className="text-gray-600 text-sm mb-2 line-clamp-2">{recipe.description}</p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">{recipe.category}</Badge>
                <Badge className={getDifficultyColor(recipe.difficulty)}>
                  {recipe.difficulty}
                </Badge>
                <Badge variant="outline">{recipe.cookingTime} min</Badge>
              </div>
            </div>
            <div className="text-right mt-2 md:mt-0">
              <p className="text-sm text-gray-500">
                <Calendar size={14} className="inline mr-1" />
                {formatDate(recipe.createdAt)}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-auto pt-4 border-t border-gray-100">
            <div className="flex items-center gap-2">
              <Eye size={16} className="text-green-500" />
              <div>
                <p className="font-semibold text-gray-800">{recipe.views.toLocaleString()}</p>
                <p className="text-xs text-gray-600">Views</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Heart size={16} className="text-red-500" />
              <div>
                <p className="font-semibold text-gray-800">{recipe.likes}</p>
                <p className="text-xs text-gray-600">Likes</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Users size={16} className="text-purple-500" />
              <div>
                <p className="font-semibold text-gray-800">{recipe.used}</p>
                <p className="text-xs text-gray-600">Used</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Share2 size={16} className="text-wasfah-orange" />
              <div>
                <p className="font-semibold text-gray-800">{recipe.shares}</p>
                <p className="text-xs text-gray-600">Shares</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};


const SharedRecipes = () => {
  const navigate = useNavigate();

  const [sharedRecipes] = useState<SharedRecipe[]>([
    {
      id: "1",
      title: "Mediterranean Chickpea Salad",
      description: "A healthy and refreshing salad perfect for summer with fresh vegetables and a tangy dressing.",
      imageUrl: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?fit=crop&w=400&q=80",
      createdAt: "2024-03-15",
      views: 1247,
      likes: 89,
      shares: 23,
      used: 156,
      category: "Salads",
      difficulty: "Easy",
      cookingTime: 15
    },
    {
      id: "2",
      title: "Homemade Pasta with Marinara",
      description: "Traditional Italian pasta recipe with fresh marinara sauce from scratch. A true comfort food.",
      imageUrl: "https://images.unsplash.com/photo-1594916892305-6497f8c054f2?fit=crop&w=400&q=80",
      createdAt: "2024-02-10",
      views: 892,
      likes: 67,
      shares: 18,
      used: 98,
      category: "Main Dishes",
      difficulty: "Intermediate",
      cookingTime: 45
    },
    {
      id: "3",
      title: "Chocolate Chip Cookies",
      description: "Classic gooey chocolate chip cookies that everyone loves. Perfect for any occasion.",
      imageUrl: "https://images.unsplash.com/photo-1558961361-b17d5985b9b7?fit=crop&w=400&q=80",
      createdAt: "2024-01-05",
      views: 2156,
      likes: 198,
      shares: 45,
      used: 289,
      category: "Desserts",
      difficulty: "Easy",
      cookingTime: 25
    },
    {
      id: "4",
      title: "Spicy Lentil Soup",
      description: "A hearty and warming lentil soup with a kick of spice, ideal for cold evenings.",
      imageUrl: "https://images.unsplash.com/photo-1598858340798-25091b6e4e5e?fit=crop&w=400&q=80",
      createdAt: "2024-04-01",
      views: 750,
      likes: 55,
      shares: 12,
      used: 70,
      category: "Soups",
      difficulty: "Easy",
      cookingTime: 30
    },
    {
      id: "5",
      title: "Beef Stir-fry with Broccoli",
      description: "Quick and delicious beef stir-fry with crisp broccoli and a savory sauce.",
      imageUrl: "https://images.unsplash.com/photo-1512401679-05f422e1766a?fit=crop&w=400&q=80",
      createdAt: "2024-03-20",
      views: 1500,
      likes: 110,
      shares: 30,
      used: 200,
      category: "Main Dishes",
      difficulty: "Intermediate",
      cookingTime: 20
    }
  ]);

  const [sortBy, setSortBy] = useState<string>("createdAt");
  const [filterCategory, setFilterCategory] = useState<string>("All");

  const totalStats = useMemo(() => ({
    totalViews: sharedRecipes.reduce((sum, recipe) => sum + recipe.views, 0),
    totalLikes: sharedRecipes.reduce((sum, recipe) => sum + recipe.likes, 0),
    totalShares: sharedRecipes.reduce((sum, recipe) => sum + recipe.shares, 0),
    totalUsed: sharedRecipes.reduce((sum, recipe) => sum + recipe.used, 0),
    totalRecipes: sharedRecipes.length
  }), [sharedRecipes]);

  const sortedAndFilteredRecipes = useMemo(() => {
    let filtered = sharedRecipes;
    if (filterCategory !== "All") {
      filtered = sharedRecipes.filter(recipe => recipe.category === filterCategory);
    }

    return [...filtered].sort((a, b) => {
      if (sortBy === "views") return b.views - a.views;
      if (sortBy === "likes") return b.likes - a.likes;
      if (sortBy === "shares") return b.shares - a.shares;
      if (sortBy === "used") return b.used - a.used;
      if (sortBy === "createdAt") return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      return 0;
    });
  }, [sharedRecipes, sortBy, filterCategory]);

  const topRecipes = useMemo(() => {
    const sortedByViews = [...sharedRecipes].sort((a, b) => b.views - a.views)[0];
    const sortedByUsed = [...sharedRecipes].sort((a, b) => b.used - a.used)[0];
    const sortedByShares = [...sharedRecipes].sort((a, b) => b.shares - a.shares)[0];
    return { sortedByViews, sortedByUsed, sortedByShares };
  }, [sharedRecipes]);

  const uniqueCategories = useMemo(() => {
    const categories = new Set(sharedRecipes.map(recipe => recipe.category));
    return ["All", ...Array.from(categories)];
  }, [sharedRecipes]);

  const exportToCSV = () => {
    const headers = ["ID", "Title", "Category", "Difficulty", "Cooking Time (min)", "Created At", "Views", "Likes", "Shares", "Used"];
    const rows = sharedRecipes.map(recipe => [
      recipe.id,
      `"${recipe.title.replace(/"/g, '""')}"`, // Handle commas in titles
      recipe.category,
      recipe.difficulty,
      recipe.cookingTime,
      recipe.createdAt,
      recipe.views,
      recipe.likes,
      recipe.shares,
      recipe.used,
    ].join(","));

    const csvContent = [headers.join(","), ...rows].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", "shared_recipes_performance.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportToPDF = () => {
    alert("PDF export functionality would be implemented using a client-side library like jsPDF or html2canvas.");
    // Example:
    // import jsPDF from 'jspdf';
    // const doc = new jsPDF();
    // doc.text("Shared Recipes Performance", 10, 10);
    // // Add table data, etc.
    // doc.save("shared_recipes_performance.pdf");
  };

  // Placeholder for chart data - in a real app, this would be dynamic over time
  const chartData = useMemo(() => {
    // Example: Sum of views per month
    const monthlyViews: { [key: string]: number } = {};
    sharedRecipes.forEach(recipe => {
      const monthYear = recipe.createdAt.substring(0, 7); // YYYY-MM
      monthlyViews[monthYear] = (monthlyViews[monthYear] || 0) + recipe.views;
    });

    return Object.keys(monthlyViews).sort().map(key => ({
      name: key,
      Views: monthlyViews[key],
    }));
  }, [sharedRecipes]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-wasfah-cream via-white to-orange-50 pb-20 pt-4">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-700 hover:text-wasfah-orange transition-colors"
          >
            <ArrowLeft size={20} />
          </Button>
          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl font-display font-bold mb-2 flex items-center gap-2 text-gray-800">
              <Share2 className="text-wasfah-orange" size={28} />
              Shared Recipes Tracking
            </h1>
            <p className="text-gray-600 text-sm sm:text-base">
              Monitor the performance and engagement of your shared recipes
            </p>
          </div>
        </div>

        {/* Overall Statistics */}
        <Separator className="my-6" />
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <BookOpen size={20} className="text-blue-500" /> Overall Performance
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
          <StatCard icon={BookOpen} label="Total Recipes" value={totalStats.totalRecipes} colorClass="text-blue-500" />
          <StatCard icon={Eye} label="Total Views" value={totalStats.totalViews.toLocaleString()} colorClass="text-green-500" />
          <StatCard icon={Heart} label="Total Likes" value={totalStats.totalLikes} colorClass="text-red-500" />
          <StatCard icon={Users} label="Times Used" value={totalStats.totalUsed} colorClass="text-purple-500" />
          <StatCard icon={Share2} label="Total Shares" value={totalStats.totalShares} colorClass="text-wasfah-orange" />
        </div>

        {/* Performance Insights */}
        <Separator className="my-6" />
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <TrendingUp size={20} className="text-wasfah-orange" /> Top Performing Recipes
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {topRecipes.sortedByViews && (
            <div className="text-center p-4 bg-green-50 rounded-lg shadow-sm">
              <p className="text-sm text-green-700 font-medium">Most Viewed Recipe</p>
              <p className="font-bold text-gray-800">{topRecipes.sortedByViews.title}</p>
              <p className="text-sm text-gray-600">{topRecipes.sortedByViews.views.toLocaleString()} views</p>
            </div>
          )}
          {topRecipes.sortedByUsed && (
            <div className="text-center p-4 bg-blue-50 rounded-lg shadow-sm">
              <p className="text-sm text-blue-700 font-medium">Most Used Recipe</p>
              <p className="font-bold text-gray-800">{topRecipes.sortedByUsed.title}</p>
              <p className="text-sm text-gray-600">{topRecipes.sortedByUsed.used} times used</p>
            </div>
          )}
          {topRecipes.sortedByShares && (
            <div className="text-center p-4 bg-purple-50 rounded-lg shadow-sm">
              <p className="text-sm text-purple-700 font-medium">Most Shared Recipe</p>
              <p className="font-bold text-gray-800">{topRecipes.sortedByShares.title}</p>
              <p className="text-sm text-gray-600">{topRecipes.sortedByShares.shares} shares</p>
            </div>
          )}
        </div>

        {/* Engagement Trends Chart Placeholder */}
        <Separator className="my-6" />
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <TrendingUp size={20} className="text-purple-500" /> Engagement Trends
        </h2>
        <Card className="mb-6 p-6">
          <CardContent className="flex flex-col items-center justify-center h-48 bg-gray-50 rounded-lg border-dashed border-2 border-gray-300 text-gray-500">
            <p className="text-center">
              <span className="font-bold">Chart Placeholder:</span> Engagement trends over time (e.g., Views per month)
            </p>
            <p className="text-sm mt-2">
              (Integrate a charting library like Recharts or Chart.js here to visualize this data:
              <pre className="bg-gray-200 p-2 rounded-md mt-2 text-xs">
                {JSON.stringify(chartData, null, 2)}
              </pre>)
            </p>
          </CardContent>
        </Card>


        {/* Export Data */}
        <Separator className="my-6" />
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Download size={20} className="text-blue-500" /> Export Performance Data
        </h2>
        <div className="flex gap-4 mb-8">
          <Button onClick={exportToCSV} className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2">
            <Download size={18} /> Export to CSV
          </Button>
          <Button onClick={exportToPDF} className="bg-red-600 hover:bg-red-700 text-white flex items-center gap-2">
            <Download size={18} /> Export to PDF (Coming Soon)
          </Button>
        </div>

        {/* Shared Recipes List with Filters and Sorting */}
        <Separator className="my-6" />
        <div className="flex justify-between items-center mb-4 flex-wrap gap-4">
          <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
            <Share2 size={20} className="text-wasfah-orange" /> Your Shared Recipes
          </h2>
          <div className="flex gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <Filter size={18} className="text-gray-600" />
              <Select onValueChange={(value) => setFilterCategory(value)} value={filterCategory}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by Category" />
                </SelectTrigger>
                <SelectContent>
                  {uniqueCategories.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <ArrowDownWideNarrow size={18} className="text-gray-600" />
              <Select onValueChange={(value) => setSortBy(value)} value={sortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="createdAt">Newest</SelectItem>
                  <SelectItem value="views">Most Viewed</SelectItem>
                  <SelectItem value="likes">Most Liked</SelectItem>
                  <SelectItem value="shares">Most Shared</SelectItem>
                  <SelectItem value="used">Most Used</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {sortedAndFilteredRecipes.length > 0 ? (
            sortedAndFilteredRecipes.map((recipe) => (
              <RecipeTile key={recipe.id} recipe={recipe} />
            ))
          ) : (
            <Card className="shadow-md">
              <CardContent className="p-8 text-center">
                <Share2 size={48} className="mx-auto mb-4 text-gray-400" />
                <h3 className="text-lg font-semibold mb-2 text-gray-800">No Shared Recipes Found</h3>
                <p className="text-gray-600 mb-4">
                  {filterCategory !== "All" ?
                    `No recipes match the selected category "${filterCategory}".` :
                    "It looks like you haven't shared any recipes yet. Share your first recipe to start tracking its performance!"
                  }
                </p>
                <Button onClick={() => navigate("/create-recipe")} className="bg-wasfah-orange hover:bg-wasfah-orange-dark text-white">
                  Create Your First Recipe
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <MobileNavigation />
    </div>
  );
};

export default SharedRecipes;
