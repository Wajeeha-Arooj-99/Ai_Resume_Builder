import React, { useState } from "react";
import { Palette } from "lucide-react";

const ColorPicker = ({ selectedColor, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);

    const predefinedColors = [
        { name: "Blue", value: "#3B82F6" },
        { name: "Violet", value: "#8B5CF6" },
        { name: "Purple", value: "#A855F7" },
        { name: "Pink", value: "#EC4899" },
        { name: "Red", value: "#EF4444" },
        { name: "Orange", value: "#F97316" },
        { name: "Amber", value: "#F59E0B" },
        { name: "Yellow", value: "#EAB308" },
        { name: "Lime", value: "#84CC16" },
        { name: "Green", value: "#10B981" },
        { name: "Emerald", value: "#059669" },
        { name: "Teal", value: "#14B8A6" },
        { name: "Cyan", value: "#06B6D4" },
        { name: "Sky", value: "#0EA5E9" },
        { name: "Indigo", value: "#6366F1" },
        { name: "Slate", value: "#64748B" },
    ];

    return (
        <div className="relative">
            {/* Color Picker Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-1 text-sm bg-gradient-to-br from-violet-50 to-violet-100 text-violet-600 ring-violet-300 hover:ring transition-all px-3 py-2 rounded-lg"
            >
                <Palette size={14} />
                <span className="max-sm:hidden">Color</span>
            </button>

            {/* Dropdown Panel */}
            {isOpen && (
                <div className="absolute top-full w-xs p-3 mt-2 space-y-3 z-10 bg-white rounded-md border border-gray-200 shadow-sm">
                    {/* Predefined Colors Grid */}
                    <div>
                        <label className="text-xs text-gray-600 mb-2 block">
                            Preset Colors
                        </label>
                        <div className="grid grid-cols-8 gap-2">
                            {predefinedColors.map((color) => (
                                <button
                                    key={color.value}
                                    onClick={() => {
                                        onChange(color.value);
                                        setIsOpen(false);
                                    }}
                                    className={`size-8 rounded-md border-2 transition-all hover:scale-110 ${selectedColor === color.value
                                            ? "border-gray-800 ring-2 ring-offset-1 ring-violet-400 scale-110"
                                            : "border-gray-300 hover:border-gray-400"
                                        }`}
                                    style={{ backgroundColor: color.value }}
                                    title={color.name}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Custom Color Picker */}
                    <div className="border-t border-gray-200 pt-3">
                        <label className="text-xs text-gray-600 mb-2 block">
                            Custom Color
                        </label>
                        <div className="flex gap-2 items-center">
                            <input
                                type="color"
                                value={selectedColor}
                                onChange={(e) => onChange(e.target.value)}
                                className="w-12 h-10 rounded border border-gray-300 cursor-pointer"
                            />
                            <input
                                type="text"
                                value={selectedColor}
                                onChange={(e) => {
                                    if (/^#[0-9A-F]{6}$/i.test(e.target.value)) {
                                        onChange(e.target.value);
                                    }
                                }}
                                className="flex-1 px-2 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                                placeholder="#3B82F6"
                                maxLength={7}
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ColorPicker;