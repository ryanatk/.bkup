" ========== PLUGINS ==========
" pathogen https://github.com/tpope/vim-pathogen
execute pathogen#infect()
set shell=/bin/bash

" ========== SETUP ==========
" turn off compatibility with the old vi
set nocompatible

" File types
filetype on

" Set fhtml to xhtml highlighting
au BufRead,BufNewFile *.ftl setfiletype xhtml
au BufRead,BufNewFile *.zml setfiletype xhtml
au BufRead,BufNewFile *.txt setfiletype xhtml
au BufRead,BufNewFile *.json setfiletype javascript
au BufRead,BufNewFile *.har setfiletype javascript

" ========== DISPLAY ==========
" enable 256 colors
set t_Co=256

" background
set bg=dark

" 256 colors broke visual mode
hi Visual cterm=reverse

" turn syntax highlighting on by default
syntax on

" show line numbers
set number

" allows full line wrap
set wrap

" ========== BEHAVIOR ==========
" indent
"autocmd FileType php,js,html,ftl,zml :set cindent
set ai
set cindent

" set our tabs to 2 spaces
set expandtab
set shiftwidth=2
set softtabstop=2

" show trailing spaces
set list listchars=tab:\ \ ,trail:·

" automatically show matching brackets. works like it does in bbedit.
set showmatch

" search related preferences
set incsearch
set hlsearch
set ignorecase
set smartcase

" turn off audible bell
set vb

" syntastic
"set statusline+=%{SyntasticStatuslineFlag()}
"let g:syntastic_check_on_open=1
"let g:syntastic_mode_map = { 'mode': 'active', 'active_filetypes': ['javascript', 'html'], 'passive_filetypes': ['css'] }

" ========== MAPPINGS ==========
" Sweet Shortcuts
nmap <CR> :w<CR>
imap <Tab> <Esc>
nmap <Space> o<Esc>
map <tab> >>
map <S-tab> <<
" Moving Around
map <C-j> }
map <C-k> {
nmap <Left> <C-u>
nmap <Right> <C-d>
nmap <Up> <C-y>
nmap <Down> <C-e>
" Tabs
nmap <C-p> :tabprevious<CR>
nmap <C-n> :tabnext<CR>
nmap <C-t> :tabnew<CR>:e ./<CR>
" Vertical Split
nmap <C-s> :rightb vsp .<CR>
nmap <C-h> <C-w>h
nmap <C-l> <C-w>l
" Nerd Tree
map <C-t> :tabnew<CR>:NERDTreeToggle<CR>
map <C-f> :NERDTreeToggle<CR>
" js comment
"vmap <C-\/> :'<,'>s/^/\/\//g<CR>

" Snippets
abbr <html> <!doctype html><CR><html><CR><head><CR>  <title></title><CR></head><CR><body><CR></body><CR></html><Esc>gg
abbr fun() (function (win, doc) {<CR>})(window, document);<Esc>O
abbr if() if () {<CR>}<Esc>?()<CR>a
abbr while() while () {<CR>}<Esc>?()<CR>a
abbr for() for (var i = 0, len = items.length; i < len; i++) {<CR>}<Esc>?items<CR>
abbr <form> <form action="" method="" id=""><CR></form>
