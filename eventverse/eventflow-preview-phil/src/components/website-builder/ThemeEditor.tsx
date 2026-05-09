import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Palette, Type, Move, RefreshCw } from "lucide-react";
import { Theme } from "@/types/website";

interface ThemeEditorProps {
  theme: Theme;
  onUpdate: (theme: Theme) => void;
}

export const ThemeEditor = ({ theme, onUpdate }: ThemeEditorProps) => {
  const handleColorChange = (colorKey: keyof Theme['colors'], value: string) => {
    onUpdate({
      ...theme,
      colors: {
        ...theme.colors,
        [colorKey]: value
      }
    });
  };

  const handleFontChange = (fontKey: keyof Theme['fonts'], value: string) => {
    onUpdate({
      ...theme,
      fonts: {
        ...theme.fonts,
        [fontKey]: value
      }
    });
  };

  const handleSpacingChange = (spacingKey: keyof Theme['spacing'], value: string) => {
    onUpdate({
      ...theme,
      spacing: {
        ...theme.spacing,
        [spacingKey]: value
      }
    });
  };

  const presetThemes = [
    {
      id: 'elegant',
      name: 'Elegant',
      colors: {
        primary: 'hsl(340, 82%, 52%)',
        secondary: 'hsl(346, 77%, 49%)',
        accent: 'hsl(24, 70%, 56%)',
        background: 'hsl(0, 0%, 100%)',
        text: 'hsl(222.2, 84%, 4.9%)',
        muted: 'hsl(210, 40%, 96%)',
      }
    },
    {
      id: 'corporate',
      name: 'Corporate',
      colors: {
        primary: 'hsl(221.2, 83.2%, 53.3%)',
        secondary: 'hsl(210, 40%, 96%)',
        accent: 'hsl(24, 70%, 56%)',
        background: 'hsl(0, 0%, 100%)',
        text: 'hsl(222.2, 84%, 4.9%)',
        muted: 'hsl(210, 40%, 96%)',
      }
    },
    {
      id: 'modern',
      name: 'Modern',
      colors: {
        primary: 'hsl(142.1, 76.2%, 36.3%)',
        secondary: 'hsl(142.1, 70%, 45%)',
        accent: 'hsl(38, 92%, 50%)',
        background: 'hsl(0, 0%, 100%)',
        text: 'hsl(222.2, 84%, 4.9%)',
        muted: 'hsl(210, 40%, 96%)',
      }
    },
    {
      id: 'dark',
      name: 'Dark',
      colors: {
        primary: 'hsl(210, 40%, 98%)',
        secondary: 'hsl(217.2, 32.6%, 17.5%)',
        accent: 'hsl(24, 70%, 56%)',
        background: 'hsl(222.2, 84%, 4.9%)',
        text: 'hsl(210, 40%, 98%)',
        muted: 'hsl(217.2, 32.6%, 17.5%)',
      }
    }
  ];

  const googleFonts = [
    'Inter',
    'Roboto',
    'Open Sans',
    'Lato',
    'Montserrat',
    'Source Sans Pro',
    'Playfair Display',
    'Merriweather',
    'Poppins',
    'Nunito'
  ];

  const applyPresetTheme = (preset: any) => {
    onUpdate({
      ...theme,
      colors: preset.colors
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold mb-2 flex items-center gap-2">
          <Palette className="w-4 h-4" />
          Theme Customization
        </h3>
        <p className="text-sm text-muted-foreground">
          Customize the look and feel of your website
        </p>
      </div>

      {/* Preset Themes */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Quick Themes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-2">
            {presetThemes.map((preset) => (
              <Button
                key={preset.id}
                variant="outline"
                size="sm"
                onClick={() => applyPresetTheme(preset)}
                className="justify-start"
              >
                <div className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: preset.colors.primary }}
                  />
                  {preset.name}
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Colors */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm flex items-center gap-2">
            <Palette className="w-4 h-4" />
            Colors
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {Object.entries(theme.colors).map(([key, value]) => (
            <div key={key} className="flex items-center gap-3">
              <Label className="w-20 text-xs capitalize">{key}</Label>
              <Input
                type="color"
                value={value.includes('hsl') ? '#000000' : value}
                onChange={(e) => handleColorChange(key as keyof Theme['colors'], e.target.value)}
                className="w-12 h-8 p-1 border rounded"
              />
              <Input
                value={value}
                onChange={(e) => handleColorChange(key as keyof Theme['colors'], e.target.value)}
                placeholder="hsl(0, 0%, 0%)"
                className="flex-1 text-xs font-mono"
              />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Typography */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm flex items-center gap-2">
            <Type className="w-4 h-4" />
            Typography
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label className="text-xs">Heading Font</Label>
            <select
              value={theme.fonts.heading}
              onChange={(e) => handleFontChange('heading', e.target.value)}
              className="w-full mt-1 p-2 border rounded-md text-sm"
            >
              {googleFonts.map((font) => (
                <option key={font} value={font}>
                  {font}
                </option>
              ))}
            </select>
          </div>

          <div>
            <Label className="text-xs">Body Font</Label>
            <select
              value={theme.fonts.body}
              onChange={(e) => handleFontChange('body', e.target.value)}
              className="w-full mt-1 p-2 border rounded-md text-sm"
            >
              {googleFonts.map((font) => (
                <option key={font} value={font}>
                  {font}
                </option>
              ))}
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Spacing */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm flex items-center gap-2">
            <Move className="w-4 h-4" />
            Spacing
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {Object.entries(theme.spacing).map(([key, value]) => (
            <div key={key} className="flex items-center gap-3">
              <Label className="w-8 text-xs uppercase">{key}</Label>
              <Input
                value={value}
                onChange={(e) => handleSpacingChange(key as keyof Theme['spacing'], e.target.value)}
                placeholder="1rem"
                className="flex-1 text-xs font-mono"
              />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Theme Info */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Theme Name:</span>
              <Badge variant="outline">{theme.name}</Badge>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Theme ID:</span>
              <code className="text-xs bg-muted px-1 rounded">{theme.id}</code>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};