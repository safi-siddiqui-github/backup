"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { X, ChevronDown } from "lucide-react";
import {
  Globe,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Users,
  Building2,
  Plus,
} from "lucide-react";
import { useBasicInfoForm } from "./use-basic-info-form";
import { CATEGORIES, TEAM_SIZE_OPTIONS } from "./constants";
import ServiceAreaCard from "./ServiceAreaCard";
import { useVendorProfile } from "../../context/VendorProfileContext";
import { useEffect } from "react";

interface BasicInfoTabProps {
  isEditMode: boolean;
}

export default function BasicInfoTab({ isEditMode }: BasicInfoTabProps) {
  const {
    formData,
    updateField,
    addServiceArea,
    removeServiceArea,
    updateServiceArea,
  } = useBasicInfoForm();
  const { setCategories } = useVendorProfile();

  // Sync categories to context
  useEffect(() => {
    setCategories(formData.category);
  }, [formData.category, setCategories]);

  return (
    <Card>
      <CardContent className="p-4 sm:p-6">
        <div className="space-y-6">
          {/* Header */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Business Information
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Basic details about your business
            </p>
          </div>

          {/* Form Fields */}
          <div className="grid gap-6 sm:grid-cols-2">
            {/* Business Name */}
            <div className="space-y-2">
              <Label htmlFor="businessName">Business Name</Label>
              <Input
                id="businessName"
                value={formData.businessName}
                onChange={(e) => updateField("businessName", e.target.value)}
                placeholder="Enter business name"
                disabled={!isEditMode}
              />
            </div>

            {/* Category - Multi-select */}
            <div className="space-y-2">
              <Label>Category</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    className="w-full justify-between font-normal h-auto min-h-10 py-2"
                    disabled={!isEditMode}
                  >
                    <div className="flex flex-1 flex-wrap gap-1 items-center">
                      {formData.category.length > 0 ? (
                        formData.category.map((cat) => (
                          <Badge
                            key={cat}
                            variant="default"
                            className="text-xs"
                            onClick={(e) => {
                              e.stopPropagation();
                              if (!isEditMode) return;
                              const newCategories = formData.category.filter(
                                (c) => c !== cat,
                              );
                              updateField("category", newCategories);
                            }}
                          >
                            {cat}
                            {isEditMode && (
                              <X className="ml-1 h-3 w-3" />
                            )}
                          </Badge>
                        ))
                      ) : (
                        <span className="text-muted-foreground">
                          Select categories
                        </span>
                      )}
                    </div>
                    <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[300px] p-0" align="start" sideOffset={4}>
                  <div className="p-4">
                    <div className="space-y-2 max-h-60 overflow-y-auto">
                      {CATEGORIES.map((cat) => {
                        const isSelected = formData.category.includes(cat);
                        return (
                          <div
                            key={cat}
                            className="flex items-center space-x-2"
                          >
                            <Checkbox
                              id={`category-${cat}`}
                              checked={isSelected}
                              onCheckedChange={(checked) => {
                                const newCategories = checked
                                  ? [...formData.category, cat]
                                  : formData.category.filter((c) => c !== cat);
                                updateField("category", newCategories);
                              }}
                            />
                            <label
                              htmlFor={`category-${cat}`}
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                            >
                              {cat}
                            </label>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>

            {/* Business Description - Full Width */}
            <div className="sm:col-span-2 space-y-2">
              <Label htmlFor="description">Business Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => updateField("description", e.target.value)}
                placeholder="Describe your business..."
                rows={4}
                className="resize-none"
                disabled={!isEditMode}
              />
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <Label htmlFor="phone" className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-gray-500" />
                Phone
              </Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => updateField("phone", e.target.value)}
                placeholder="+1-555-0123"
                disabled={!isEditMode}
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-gray-500" />
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => updateField("email", e.target.value)}
                placeholder="email@example.com"
                disabled={!isEditMode}
              />
            </div>

            {/* Website */}
            <div className="space-y-2">
              <Label htmlFor="website" className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-gray-500" />
                Website
              </Label>
              <Input
                id="website"
                type="url"
                value={formData.website}
                onChange={(e) => updateField("website", e.target.value)}
                placeholder="www.example.com"
                disabled={!isEditMode}
              />
            </div>

            {/* Service Areas - Full Width */}
            <div className="sm:col-span-2 space-y-3">
              <div className="flex items-center justify-between">
                <Label className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  Service Area
                </Label>
                {isEditMode && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addServiceArea}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Area
                  </Button>
                )}
              </div>

              <div className="space-y-3">
                {formData.serviceAreas.map((area) => (
                  <ServiceAreaCard
                    key={area.id}
                    area={area}
                    isEditMode={isEditMode}
                    onUpdate={updateServiceArea}
                    onRemove={removeServiceArea}
                  />
                ))}
              </div>
            </div>

            {/* Business Address - Full Width */}
            <div className="sm:col-span-2 space-y-3">
              <Label className="flex items-center gap-2">
                <Building2 className="h-4 w-4 text-gray-500" />
                Business Address
              </Label>
              <div className="grid gap-4 sm:grid-cols-2">
                {/* Street Address */}
                <div className="sm:col-span-2 space-y-2">
                  <Label htmlFor="businessStreet">Street Address</Label>
                  <Input
                    id="businessStreet"
                    value={formData.businessStreet}
                    onChange={(e) => updateField("businessStreet", e.target.value)}
                    placeholder="123 Business St"
                    disabled={!isEditMode}
                  />
                </div>

                {/* City */}
                <div className="space-y-2">
                  <Label htmlFor="businessCity">City</Label>
                  <Input
                    id="businessCity"
                    value={formData.businessCity}
                    onChange={(e) => updateField("businessCity", e.target.value)}
                    placeholder="City"
                    disabled={!isEditMode}
                  />
                </div>

                {/* State */}
                <div className="space-y-2">
                  <Label htmlFor="businessState">State</Label>
                  <Input
                    id="businessState"
                    value={formData.businessState}
                    onChange={(e) => updateField("businessState", e.target.value)}
                    placeholder="ST"
                    maxLength={2}
                    disabled={!isEditMode}
                  />
                </div>

                {/* Zip Code */}
                <div className="space-y-2">
                  <Label htmlFor="businessZip">Zip Code</Label>
                  <Input
                    id="businessZip"
                    value={formData.businessZip}
                    onChange={(e) => updateField("businessZip", e.target.value)}
                    placeholder="12345"
                    disabled={!isEditMode}
                  />
                </div>
              </div>
            </div>

            {/* Year Established */}
            <div className="space-y-2">
              <Label htmlFor="yearEstablished" className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gray-500" />
                Year Established
              </Label>
              <Input
                id="yearEstablished"
                type="number"
                value={formData.yearEstablished}
                onChange={(e) => updateField("yearEstablished", e.target.value)}
                placeholder="2015"
                min="1900"
                max={new Date().getFullYear()}
                disabled={!isEditMode}
              />
            </div>

            {/* Team Size */}
            <div className="space-y-2">
              <Label htmlFor="teamSize" className="flex items-center gap-2">
                <Users className="h-4 w-4 text-gray-500" />
                Team Size
              </Label>
              <Select
                value={formData.teamSize}
                onValueChange={(value) => updateField("teamSize", value)}
                disabled={!isEditMode}
              >
                <SelectTrigger id="teamSize" className="w-full">
                  <SelectValue placeholder="Select team size" />
                </SelectTrigger>
                <SelectContent>
                  {TEAM_SIZE_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

