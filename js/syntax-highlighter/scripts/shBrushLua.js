/**
 * SyntaxHighlighter Brush for Lua/Luau
 * Created for Direct Game Dialog (DGD) documentation
 * Compatible with SyntaxHighlighter v3.x
 */

(function() {
    // CommonJS export
    if (typeof exports !== 'undefined') {
        exports.Brush = Brush;
    } else {
        // Browser global
        SyntaxHighlighter = SyntaxHighlighter || {};
        SyntaxHighlighter.brushes = SyntaxHighlighter.brushes || {};
        SyntaxHighlighter.brushes.Lua = Brush;
    }

    function Brush() {
        // Lua keywords
        var keywords = 'and break do else elseif end false for function if in local nil not or repeat return then true until while';

        // Luau-specific additions (Roblox-specific keywords and types)
        var luauKeywords = 'continue export type typeof';

        // Built-in Lua/Luau functions
        var functions = 'assert collectgarbage coroutine debug error getfenv getmetatable ipairs loadstring next pairs pcall print rawequal rawget rawset select setfenv setmetatable tonumber tostring type unpack xpcall';

        // Common Roblox/Luau globals and services
        var robloxGlobals = 'game workspace script Instance new wait yield Delay Spawn BindableEvent BindableFunction RemoteEvent RemoteFunction ReplicatedStorage ServerScriptService StarterGui StarterPlayer StarterPlayerScripts Players LocalPlayer';

        // Regular expressions for syntax elements
        this.regexList = [
            // Multi-line comments: --[[ ... ]]
            { regex: /--\[\[[\s\S]*?\]\]/g, css: 'comments' },
            // Single-line comments: --
            { regex: /--[^\n]*/g, css: 'comments' },
            // Strings: double quotes
            { regex: /"[^"\n]*"/g, css: 'string' },
            // Strings: single quotes
            { regex: /'[^'\n]*'/g, css: 'string' },
            // Long strings: [[ ... ]]
            { regex: /\[\[[\s\S]*?\]\]/g, css: 'string' },
            // Numbers: integers and floats
            { regex: /\b\d+\.?\d*([eE][+-]?\d+)?\b/g, css: 'value' },
            // Keywords
            { regex: new RegExp(this.getKeywords(keywords), 'b\\m'), css: 'keyword' },
            // Luau-specific keywords
            { regex: new RegExp(this.getKeywords(luauKeywords), 'b\\m'), css: 'keyword' },
            // Built-in functions
            { regex: new RegExp(this.getKeywords(functions), 'b\\m'), css: 'functions' },
            // Roblox globals
            { regex: new RegExp(this.getKeywords(robloxGlobals), 'b\\m'), css: 'color1' }, // Custom style for Roblox globals
            // Common operators
            { regex: /[\+\-\*\/\%\^\#\<\>\=\~]/g, css: 'operator' }
        ];

        // Define aliases for the brush
        this.forHtmlScript({
            left: /(&lt;|<)script\b[^>]*>/gi,
            right: /(&gt;|>)<\/script>/gi
        });
    }

    Brush.prototype = new SyntaxHighlighter.Highlighter();
    Brush.aliases = ['lua', 'luau'];

})();
