
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

interface Category {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  gradient: string;
  bgColor: string;
  delay: string;
}

interface CategoryCardProps {
  category: Category;
  onClick: () => void;
}

const CategoryCard = ({ category, onClick }: CategoryCardProps) => {
  const { title, description, icon: Icon, gradient, bgColor, delay } = category;

  return (
    <Card 
      className={`card-hover cursor-pointer overflow-hidden animate-scale-in ${bgColor} border-0 shadow-lg`}
      style={{ animationDelay: delay }}
      onClick={onClick}
    >
      <CardContent className="p-6 h-full">
        <div className="flex flex-col items-center text-center h-full">
          {/* Animated Icon */}
          <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${gradient} flex items-center justify-center mb-4 animate-float shadow-lg`}>
            <Icon className="h-8 w-8 text-white" />
          </div>
          
          {/* Title */}
          <h3 className="text-xl font-bold mb-2 text-gray-800">{title}</h3>
          
          {/* Description */}
          <p className="text-sm text-gray-600 mb-4 flex-grow">{description}</p>
          
          {/* Action Button */}
          <Button 
            className={`w-full bg-gradient-to-r ${gradient} hover:shadow-lg transition-all duration-300 border-0 text-white`}
            onClick={(e) => {
              e.stopPropagation();
              onClick();
            }}
          >
            Explore {title}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CategoryCard;
