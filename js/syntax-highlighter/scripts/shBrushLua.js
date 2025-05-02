/**
 * SyntaxHighlighter Brush for Lua/Luau
 * Created for Direct Game Dialog (DGD) documentation
 * Compatible with SyntaxHighlighter v3.x
 * Highlights standard Lua syntax, Luau extensions, and Roblox-specific features
 */

(function() {
    // CommonJS export for Node.js environments
    if (typeof exports !== 'undefined') {
        exports.Brush = Brush;
    } else {
        // Browser global for web environments
        SyntaxHighlighter = SyntaxHighlighter || {};
        SyntaxHighlighter.brushes = SyntaxHighlighter.brushes || {};
        SyntaxHighlighter.brushes.Lua = Brush;
    }

    function Brush() {
        // **Lua and Luau Keywords**
        var keywords = 'and break do else elseif end false for function if in local nil not or repeat return then true until while continue export type typeof';

        // **Built-in Lua/Luau Functions**
        var functions = 'assert collectgarbage coroutine debug error getfenv getmetatable ipairs loadstring next pairs pcall print rawequal rawget rawset select setfenv setmetatable tonumber tostring type unpack xpcall wait spawn delay';

        // **Roblox-Specific Globals and Common Services**
        var robloxGlobals = 'game workspace script Instance new wait yield Delay Spawn BindableEvent BindableFunction RemoteEvent RemoteFunction ReplicatedStorage ServerScriptService ServerStorage StarterGui StarterPlayer StarterPlayerScripts StarterCharacterScripts Players LocalPlayer SoundService TweenService UserInputService RunService HttpService DataStoreService MarketplaceService TeleportService';

        // **Helper Function to Generate Keyword Regex**
        this.getKeywords = function(str) {
            str = str.replace(/^\s+|\s+$/g, '').replace(/\s+/g, '|');
            return '\\b(?:' + str + ')\\b';
        };

        // **Regular Expressions for Syntax Highlighting**
        this.regexList = [
            // 1. Multi-line Comments: --[[ ... ]]
            { regex: /--\[\[[\s\S]*?\]\]/g, css: 'comments' },
            
            // 2. Single-line Comments: -- ...
            { regex: /--[^\n]*/g, css: 'comments' },
            
            // 3. Multi-line Strings: [[ ... ]]
            { regex: /\[\[[\s\S]*?\]\]/g, css: 'string' },
            
            // 4. Double-quoted Strings: "..."
            { regex: /"[^"\n]*"/g, css: 'string' },
            
            // 5. Single-quoted Strings: '...'
            { regex: /'[^'\n]*'/g, css: 'string' },
            
            // 6. Numbers: Integers, Floats, Hexadecimal (e.g., 0x1A)
            { regex: /\b(0x[\da-fA-F]+|\d+\.?\d*([eE][+-]?\d+)?)\b/g, css: 'value' },
            
            // 7. Function Definitions: function name (highlights 'name')
            { regex: /function\s+([a-zA-Z_]\w*)/g, css: 'functions' },
            
            // 8. Local Variables: local name (highlights 'name')
            { regex: /local\s+([a-zA-Z_]\w*)/g, css: 'variable' },
            
            // 9. Keywords
            { regex: new RegExp(this.getKeywords(keywords), 'gm'), css: 'keyword' },
            
            // 10. Built-in Functions
            { regex: new RegExp(this.getKeywords(functions), 'gm'), css: 'functions' },
            
            // 11. Roblox Globals
            { regex: new RegExp(this.getKeywords(robloxGlobals), 'gm'), css: 'color1' },
            
            // 12. Operators: Arithmetic, Comparison, Logical
            { regex: /[\+\-\*\/\%\^\#\<\>\=\~]/g, css: 'operator' },
            
            // 13. Punctuation: Brackets, Parentheses, Commas, etc.
            { regex: /[\{\}\[\]\(\)\.,;:]/g, css: 'punctuation' },
            
            // 14. Method Calls: object:method (highlights 'method')
            { regex: /(\w+)\s*:/g, css: 'functions' },
            
            // 15. Table Field Access: object.field (highlights 'field')
            { regex: /(\w+)\s*\./g, css: 'color2' }
        ];

        // **Optional: HTML Script Tag Detection (Rarely Used for Lua)**
        this.forHtmlScript({
            left: /(<|<)script\b[^>]*>/gi,
            right: /(>|>)<\/script>/gi
        });
    }

    // **Inherit from SyntaxHighlighter Base Class**
    Brush.prototype = new SyntaxHighlighter.Highlighter();
    
    // **Aliases for the Brush**
    Brush.aliases = ['lua', 'luau'];
})();
