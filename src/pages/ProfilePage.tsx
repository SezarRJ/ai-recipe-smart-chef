
import React from "react";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { UserRound, Mail, CalendarDays, Pencil, Star, Heart, BookOpen, Leaf, LogOut, Instagram, Globe } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useProfile } from "@/hooks/useProfile";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const { profile, loading } = useProfile();
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const joinYear = profile?.created_at ? new Date(profile.created_at).getFullYear() : "—";

  return (
    <MobileLayout header={{ title: "Profile", showBackButton: true }}>
      <div className="flex flex-col items-center space-y-6 py-6">
        {/* Avatar and basic info */}
        <div className="w-24 h-24 relative">
          <Avatar className="w-24 h-24 shadow-lg border-2 border-wasfah-bright-teal">
            {profile?.avatar_url ? (
              <AvatarImage src={profile.avatar_url} alt="User Avatar" />
            ) : (
              <AvatarFallback>
                <UserRound size={52} className="text-wasfah-bright-teal" />
              </AvatarFallback>
            )}
          </Avatar>
          <Button
            variant="outline"
            size="xs"
            className="absolute bottom-1 right-1 p-1 rounded-full bg-white border border-gray-200 hover:bg-gray-50 shadow"
            onClick={() => navigate("/edit-profile")}
            aria-label="Edit Profile"
          >
            <Pencil size={16} className="text-wasfah-teal" />
          </Button>
        </div>
        <div className="text-center space-y-1">
          <div className="text-2xl font-bold text-wasfah-deep-teal">{profile?.full_name || "User Name"}</div>
          <div className="flex items-center justify-center text-gray-600 gap-2">
            <Mail size={16} /> {profile?.id ? profile.id : "user@example.com"}
          </div>
          <div className="flex items-center justify-center text-gray-400 gap-2 text-sm">
            <CalendarDays size={14} /> Member since {joinYear}
          </div>
          {profile?.bio && (
            <div className="mt-2 text-gray-500 text-sm px-4">{profile.bio}</div>
          )}
        </div>

        {/* Profile quick stats */}
        <div className="w-full grid grid-cols-3 gap-4">
          <Card>
            <CardContent className="flex flex-col items-center px-2 py-3">
              <BookOpen size={20} className="text-wasfah-bright-teal mb-1" />
              <div className="font-bold text-lg">21</div>
              <div className="text-xs text-gray-500">Recipes</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex flex-col items-center px-2 py-3">
              <Heart size={20} className="text-wasfah-orange mb-1" />
              <div className="font-bold text-lg">52</div>
              <div className="text-xs text-gray-500">Favorites</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex flex-col items-center px-2 py-3">
              <Star size={20} className="text-yellow-400 mb-1" />
              <div className="font-bold text-lg">8</div>
              <div className="text-xs text-gray-500">Achievements</div>
            </CardContent>
          </Card>
        </div>

        {/* Preferences & info */}
        <div className="w-full max-w-md space-y-3 pt-2">
          {profile?.dietary_preferences && profile.dietary_preferences.length > 0 && (
            <div className="flex items-center gap-2">
              <Leaf size={16} className="text-green-400" />
              <span className="font-semibold text-gray-700">Dietary: </span>
              <span className="text-gray-600 text-sm">
                {profile.dietary_preferences.join(", ")}
              </span>
            </div>
          )}
          {profile?.cuisine_preferences && profile.cuisine_preferences.length > 0 && (
            <div className="flex items-center gap-2">
              <Globe size={16} className="text-wasfah-bright-teal" />
              <span className="font-semibold text-gray-700">Cuisine: </span>
              <span className="text-gray-600 text-sm">
                {profile.cuisine_preferences.join(", ")}
              </span>
            </div>
          )}
          {profile?.allergies && profile.allergies.length > 0 && (
            <div className="flex items-center gap-2">
              <span className="font-semibold text-gray-700">Allergies: </span>
              <span className="text-gray-600 text-sm">
                {profile.allergies.join(", ")}
              </span>
            </div>
          )}
        </div>

        {/* Recent activity */}
        <div className="w-full bg-white rounded-lg shadow-sm p-4 mt-2 space-y-3">
          <div className="font-semibold text-gray-700 flex items-center gap-2">
            <Star size={16} className="text-yellow-400" />
            Recent Activity
          </div>
          <div className="text-sm text-gray-500">
            {/* Mock recent activity; real data would come from backend */}
            <ul className="list-disc list-inside pl-2 space-y-1">
              <li>Added a new recipe: “Mango Lassi”</li>
              <li>Favorited “Zaatar Manakeesh”</li>
              <li>Achieved “Healthy Chef” badge</li>
            </ul>
          </div>
        </div>

        {/* Action buttons */}
        <div className="w-full flex justify-center gap-3 pt-4">
          <Button variant="outline" size="sm" className="flex-1" onClick={() => navigate("/edit-profile")}>
            <Pencil size={16} /> Edit Profile
          </Button>
          <Button variant="destructive" size="sm" className="flex-1" onClick={signOut}>
            <LogOut size={16} /> Log Out
          </Button>
        </div>

        {/* Social links (placeholder) */}
        <div className="w-full max-w-xs flex justify-center gap-4 pt-2">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">
            <Instagram size={22} className="text-pink-500" />
          </a>
          <a href="https://wasfah.app" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">
            <Globe size={22} className="text-wasfah-bright-teal" />
          </a>
        </div>
      </div>
    </MobileLayout>
  );
};

export default ProfilePage;
