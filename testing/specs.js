/* global describe,it,browser,element,by,expect,beforeEach*/
'use strict';

var convertType = {
    FontYapata: 0,
    FontGilaiPraong: 1,
    FontCamEFEO: 2,
    FontKTT: 3,
    FontUniCamKur: 4,
    FontUniCamVN: 5,

    TransCamEFEO: 6,
    TransInrasara: 7,
    TransKawomTT: 8
};

var assert = function(source, expected) {
    // Input source text
    var sourceCtrl = element(by.model('ctrl.sourceText'));
    sourceCtrl.clear().then(function() {
        sourceCtrl.sendKeys(source);
    });

    // Get destination text
    var elm = element.all(by.repeater('text in ctrl.destinations')).get(0);

    // Check expectation
    expect(elm.getText()).toEqual(expected);
};

var select = function(soureType, clickSourceMore, destinationType, clickDestinationMore) {

    // Waiting for source-more control visible
    browser.wait(function() {
        var control = by.id('source-more');
        return control && element(control).isPresent();
    });
    if (clickSourceMore) {
        element(by.id('source-more')).click();
    }

    // Select source type
    element(by.id('source-' + soureType)).click();

    // Select destination type
    if (clickDestinationMore) {
        element(by.id('destination-more')).click();
    }
    element(by.id('destination-' + destinationType)).click();
};

describe('Convert page', function() {
    beforeEach(function() {
        // Open convert page
        browser.get('http://localhost:8080/#/converter', 50000);
    });

    it('convert from EFEO to font Yapata 1', function() {
        select(convertType.TransCamEFEO, true, convertType.FontYapata, false);
        var source = 'Mai raweng palei adei aey hai juai mboh mâda blaoh war aey xa-ai. Dua urang sa pajaih ppajiéng mai, juai nâh rabha ka talah tung hatai.';
        var expected = '=m rw$ pl] ad] a@Y =h =j& -OH md% -b*<H wR a@Y x=I. d&% ur/ s% p=jH F-j`$ =m, =j& nH rB% k% tlH t~/ h=t.';
        assert(source, expected);
    });

    it('convert from EFEO to font Yapata 2', function() {
        select(convertType.TransCamEFEO, true, convertType.FontYapata, false);
        var source = 'Ké kan cek kraong glai min kar di tian xa-ai, tambuak takai mai ka adei buei hai. Mboh mbaok mbluak di jién padai, xa-ai saong adei ndom klaw cheh chai.';
        var expected = '-k^ kN c@K -\\k" =g* m{N kR d} t`N x=I, tO&K t=k =m k% ad] b&] =h. -OH -O<K O)K d} -j`@N p=d, x=I -s" ad] -Q\' k*w S@H =S.';
        assert(source, expected);
    });
});

describe('Convert from akhar thrah to transliteration', function() {
    beforeEach(function() {
        // Open convert page
        browser.get('http://localhost:8080/#/converter', 50000);
    });

    it('should convert from font Yapata to EFEO transliteration', function() {
        select(convertType.FontYapata, false, convertType.TransCamEFEO, true);
        var source = 'hj%N bL l{a&%, r~%P \\t# a`% am% l{aN y~H y~H. pQ`K b{l%N y&K a=m%K -n< -m<T -a< AN oH z~Y E{R. O$ -k`# O$ a;%N a=m%K am% hl%R t`N. mr%T s% jl%N -r" an%K -n< bC. l{-gY ZK apH l{gH ZK cd&%% oH md% O&H kR. \\bH p=d m=\\EY -j`@N -QC v[ a=m%K am% an{T p-y@R. xn/ atH c`{P rOH J%K dh(w s`\' hd]. eL r~%P \\d] hl] b~w tL. a^N =z \\p" -g*" an%K l{k~w Q&% -n", E~N aqK b{lN hd], a`% hr] hdH h=d, an%K w@K g{lC =m -F%K l{E] -F%K a`%, s% r{t~H E~N th% a=m%K am% b~Y t`N. s/ F-Q^ pg% jl@H o% m" \\d@H y~w ur/. m{N a=m%K am% t`N h% -hY \\p" k% an%K r-l%. xn/ atH c`{P rOH -p`@H k% jl%N hd]. wR r~%P \\d] k% an%K dH -O<K.';
        var expected = 'hajan bal liaua, rup trem aia amâ lian yuh yuh. pandiak bilan yuak amaik nao maot ao khan oh nguy thir. mbeng kiém mbeng ân amaik amâ halar tian. mârat sa jalan raong anâk nao bac. ligoy ngak apah ligah ngak cadua oh mâda mbuah kar. brah padai mâthraiy jién ndoc nyim amaik amâ anit payér. xanâng atah ciip rambah jhak dahluw siam hadei. él rup drei halei buw tal. aen ngai praong glaong anâk likuw ndua naong, thun anak bilan hadei, aia harei hadah hadai, anâk wek gilac mai ppok lithei ppok aia, sa rituh thun taha amaik amâ buy tian. sang ppandé paga jaleh o maong dreh yuw urang. min amaik amâ tian ha hoy praong ka anâk ralo. xanâng atah ciip rambah piéh ka jalan hadei. war rup drei ka anâk dah mbaok.';
        assert(source, expected);
    });

    it('should convert from font Yapata to EFEO transliteration 2', function() {
        select(convertType.FontYapata, false, convertType.TransCamEFEO, true);
        var source = '-k>p~t^';
        var expected = 'kaompute';
        assert(source, expected);
    });

    it('should convert from font Yapata to Inrasara transliteration', function() {
        select(convertType.FontYapata, false, convertType.TransInrasara, true);
        var source = 'hj%N bL l{a&%, r~%P \\t# a`% am% l{aN y~H y~H. pQ`K b{l%N y&K a=m%K -n< -m<T -a< AN oH z~Y E{R. O$ -k`# O$ a;%N a=m%K am% hl%R t`N. mr%T s% jl%N -r" an%K -n< bC. l{-gY ZK apH l{gH ZK cd&%% oH md% O&H kR. \\bH p=d m=\\EY -j`@N -QC v[ a=m%K am% an{T p-y@R. xn/ atH c`{P rOH J%K dh(w s`\' hd]. eL r~%P \\d] hl] b~w tL. a^N =z \\p" -g*" an%K l{k~w Q&% -n", E~N aqK b{lN hd], a`% hr] hdH h=d, an%K w@K g{lC =m -F%K l{E] -F%K a`%, s% r{t~H E~N th% a=m%K am% b~Y t`N. s/ F-Q^ pg% jl@H o% m" \\d@H y~w ur/. m{N a=m%K am% t`N h% -hY \\p" k% an%K r-l%. xn/ atH c`{P rOH -p`@H k% jl%N hd]. wR r~%P \\d] k% an%K dH -O<K.';
        var expected = 'hajan bal liawa, rup trơm aia amư lian yuh yuh. pađiak bilan ywak amaik nau maut au khan oh nguy thir. bbơng kiem bbơng ưn amaik amư halar tian. mưrat sa jalan raung anưk nau bac. ligoy ngak apah ligah ngak cadwa oh mưda bbwah kar. brah padai mưthraiy jien đoc nhim amaik amư anit payer. xanưng atah ciip rabbah jhak dahluw siam hadei. el rup drei halei buw tal. aơn ngai praung glaung anưk likuw đwa naung, thun anak bilan hadei, aia harei hadah hadai, anưk wơk gilac mai ppok lithei ppok aia, sa rituh thun taha amaik amư buy tian. sang ppađe paga jalơh o maung drơh yuw urang. min amaik amư tian ha hoy praung ka anưk ralo. xanưng atah ciip rabbah pieh ka jalan hadei. war rup drei ka anưk dah bbauk.';
        assert(source, expected);
    });

    it('should convert from font Yapata to KTT transliteration', function() {
        select(convertType.FontYapata, false, convertType.TransKawomTT, true);
        var source = 'hj%N bL l{a&%, r~%P \\t# a`% am% l{aN y~H y~H. pQ`K b{l%N y&K a=m%K -n< -m<T -a< AN oH z~Y E{R. O$ -k`# O$ a;%N a=m%K am% hl%R t`N. mr%T s% jl%N -r" an%K -n< bC. l{-gY ZK apH l{gH ZK cd&%% oH md% O&H kR. \\bH p=d m=\\EY -j`@N -QC v[ a=m%K am% an{T p-y@R. xn/ atH c`{P rOH J%K dh(w s`\' hd]. eL r~%P \\d] hl] b~w tL. a^N =z \\p" -g*" an%K l{k~w Q&% -n", E~N aqK b{lN hd], a`% hr] hdH h=d, an%K w@K g{lC =m -F%K l{E] -F%K a`%, s% r{t~H E~N th% a=m%K am% b~Y t`N. s/ F-Q^ pg% jl@H o% m" \\d@H y~w ur/. m{N a=m%K am% t`N h% -hY \\p" k% an%K r-l%. xn/ atH c`{P rOH -p`@H k% jl%N hd]. wR r~%P \\d] k% an%K dH -O<K.';
        var expected = 'hajan bal liawa, rup trơm aia amư lian yuh yuh. pađiak bilan ywak amek nao moot aao khan ôh nguy thir. bbơng kiêm bbơng ưn amek amư halar tian. mưrat sa jalan roong anưk nao bac. ligôy ngak apah ligah ngak cadwa ôh mưda bbwah kar. brah padai mưthrey jiên đôc nhim amek amư anit payêr. xanưng atah ciip rabbah jhak dahluw siam hadei. êl rup drei halei buw tal. aơơn ngai prong gloong anưk likuw đwa noong, thun anak bilan hadei, aia harei hadah hadai, anưk wơk gilac mai ppôk lithei ppôk aia, sa rituh thun taha amek amư buy tian. sang ppađê paga jalơh ô mong drơh yuw urang. min amek amư tian ha hôy prong ka anưk ralô. xanưng atah ciip rabbah piêh ka jalan hadei. war rup drei ka anưk dah bbook.';
        assert(source, expected);
    });
});

describe('Convert from transliteration to transliteration', function() {
    beforeEach(function() {
        // Open convert page
        browser.get('http://localhost:8080/#/converter', 20000);
    });

    var select = function(soureType, destinationType) {

        // Select EFEO transliteration
        element(by.id('source-more')).click();
        element(by.id('source-' + soureType)).click();

        // Select Yapata font
        element(by.id('destination-more')).click();
        element(by.id('destination-' + destinationType)).click();
    };

    it('should convert from EFEO to Inrasara transliteration', function() {
        select(convertType.TransCamEFEO, convertType.TransInrasara);
        var source = 'hajan bal liaua, rup trem aia amâ lian yuh yuh. pandiak bilan yuak amaik nao maot ao khan oh nguy thir. mbeng kiém mbeng ân amaik amâ halar tian. mârat sa jalan raong anâk nao bac. ligoy ngak apah ligah ngak cadua oh mâda mbuah kar. brah padai mâthraiy jién ndoc nyim amaik amâ anit payér. xanâng atah ciip rambah jhak dahluw siam hadei. él rup drei halei buw tal. aen ngai praong glaong anâk likuw ndua naong, thun anak bilan hadei, aia harei hadah hadai, anâk wek gilac mai ppok lithei ppok aia, sa rituh thun taha amaik amâ buy tian. sang ppandé paga jaleh o maong dreh yuw urang. min amaik amâ tian ha hoy praong ka anâk ralo. xanâng atah ciip rambah piéh ka jalan hadei. war rup drei ka anâk dah mbaok.';
        var expected = 'hajan bal liawa, rup trơm aia amư lian yuh yuh. pandiak bilan ywak amaik nau maut au khan oh nguy thir. bbơng kiem bbơng ưn amaik amư halar tian. mưrat sa jalan raung anưk nau bac. ligoy ngak apah ligah ngak cadwa oh mưda bbwah kar. brah padai mưthraiy jien ndoc nhim amaik amư anit payer. xanưng atah ciip rabbah jhak dahluw siam hadei. el rup drei halei buw tal. aơn ngai praung glaung anưk likuw ndwa naung, thun anak bilan hadei, aia harei hadah hadai, anưk wơk gilac mai ppok lithei ppok aia, sa rituh thun taha amaik amư buy tian. sang ppande paga jalơh o maung drơh yuw urang. min amaik amư tian ha hoy praung ka anưk ralo. xanưng atah ciip rabbah pieh ka jalan hadei. war rup drei ka anưk dah bbauk.';
        assert(source, expected);
    });

    it('should convert from Inrasara to EFEO transliteration', function() {
        select(convertType.TransInrasara, convertType.TransCamEFEO);
        var expected = 'hajan bal liawa, rup trem aia amâ lian yuh yuh. pandiak bilan yuak amaik nao maot ao khan oh nguy thir. mbeng kiém mbeng ân amaik amâ halar tian. mârat sa jalan raong anâk nao bac. ligoy ngak apah ligah ngak cadua oh mâda mbuah kar. brah padai mâthraiy jién ndoc nyim amaik amâ anit payér. xanâng atah ciip rambah jhak dahluw siam hadei. él rup drei halei buw tal. aen ngai praong glaong anâk likuw ndua naong, thun anak bilan hadei, aia harei hadah hadai, anâk wek gilac mai ppok lithei ppok aia, sa rituh thun taha amaik amâ buy tian. sang ppandé paga jaleh o maong dreh yuw urang. min amaik amâ tian ha hoy praong ka anâk ralo. xanâng atah ciip rambah piéh ka jalan hadei. war rup drei ka anâk dah mbaok.';
        var source = 'hajan bal liawa, rup trơm aia amư lian yuh yuh. pandiak bilan ywak amaik nau maut au khan oh nguy thir. bbơng kiem bbơng ưn amaik amư halar tian. mưrat sa jalan raung anưk nau bac. ligoy ngak apah ligah ngak cadwa oh mưda bbwah kar. brah padai mưthraiy jien ndoc nhim amaik amư anit payer. xanưng atah ciip rabbah jhak dahluw siam hadei. el rup drei halei buw tal. aơn ngai praung glaung anưk likuw ndwa naung, thun anak bilan hadei, aia harei hadah hadai, anưk wơk gilac mai ppok lithei ppok aia, sa rituh thun taha amaik amư buy tian. sang ppande paga jalơh o maung drơh yuw urang. min amaik amư tian ha hoy praung ka anưk ralo. xanưng atah ciip rabbah pieh ka jalan hadei. war rup drei ka anưk dah bbauk.';
        assert(source, expected);
    });

    it('should convert from KTT to EFEO transliteration', function() {
        select(convertType.TransKawomTT, convertType.TransCamEFEO);
        var source = 'Hajaan bal li-awa ruup trơm ia amư li-an yuh yuh. Pađiak bilaan ywak ameek naw moot aw khan ôh nguy thin. Bbơng kiêm bbơng ưưn ameek amư halaar tian. Mưraat sa jalaan roong anưưk naw bac. Ligôy ngak apah ligah ngak cadwa ôh mưda bbwah kar. Brah padai mưthrey jiên đôc nhim ameek amư anit payêr. Xanưng atah ciip rabbah jhaak dahluw siam hadei. El ruup drei halei buw tal. Ơn ngai prong gloong anưưk likuw đwa noong, Thun anak bilan hadei, ia harei hadah hadai, Anưưk wơk gilac mai ppôk lithei ppôk ia, Sa rituh thun taha ameek amư buy tian. Sang pađiê paga jalơh ô mong drơh yuw urang. Min ameek amư tian ha hôy prong ka anưưk ralô. Xanưng atah ciip rabbah piêh ka jalaan hadei. War ruup drei ka anưưk dah bbook.';
        var expected = 'hajan bal li-awa rup trem ia amâ li-an yuh yuh. pandiak bilan yuak amaik naw maot aw khan oh nguy thin. mbeng kiém mbeng ân amaik amâ halar tian. mârat sa jalan raong anâk naw bac. ligoy ngak apah ligah ngak cadua oh mâda mbuah kar. brah padai mâthraiy jién ndoc nyim amaik amâ anit payér. xanâng atah ciip rambah jhak dahluw siam hadei. ail rup drei halei buw tal. en ngai praong glaong anâk likuw ndua naong, thun anak bilan hadei, ia harei hadah hadai, anâk wek gilac mai ppok lithei ppok ia, sa rituh thun taha amaik amâ buy tian. sang pandié paga jaleh o maong dreh yuw urang. min amaik amâ tian ha hoy praong ka anâk ralo. xanâng atah ciip rambah piéh ka jalan hadei. war rup drei ka anâk dah mbaok.';
        assert(source, expected);
    });

    it('should convert from KTT to Inrasara transliteration', function() {
        select(convertType.TransKawomTT, convertType.TransInrasara);
        var source = 'Hajaan bal li-awa ruup trơm ia amư li-an yuh yuh. Pađiak bilaan ywak ameek naw moot aw khan ôh nguy thin. Bbơng kiêm bbơng ưưn ameek amư halaar tian. Mưraat sa jalaan roong anưưk naw bac. Ligôy ngak apah ligah ngak cadwa ôh mưda bbwah kar. Brah padai mưthrey jiên đôc nhim ameek amư anit payêr. Xanưng atah ciip rabbah jhaak dahluw siam hadei. El ruup drei halei buw tal. Ơn ngai prong gloong anưưk likuw đwa noong, Thun anak bilan hadei, ia harei hadah hadai, Anưưk wơk gilac mai ppôk lithei ppôk ia, Sa rituh thun taha ameek amư buy tian. Sang pađiê paga jalơh ô mong drơh yuw urang. Min ameek amư tian ha hôy prong ka anưưk ralô. Xanưng atah ciip rabbah piêh ka jalaan hadei. War ruup drei ka anưưk dah bbook.';
        var expected = 'hajan bal li-awa rup trơm ia amư li-an yuh yuh. pađiak bilan ywak amaik naw maut aw khan oh nguy thin. bbơng kiem bbơng ưn amaik amư halar tian. mưrat sa jalan raung anưk naw bac. ligoy ngak apah ligah ngak cadwa oh mưda bbwah kar. brah padai mưthraiy jien đoc nhim amaik amư anit payer. xanưng atah ciip rabbah jhak dahluw siam hadei. ail rup drei halei buw tal. ơn ngai praung glaung anưk likuw đwa naung, thun anak bilan hadei, ia harei hadah hadai, anưk wơk gilac mai ppok lithei ppok ia, sa rituh thun taha amaik amư buy tian. sang pađie paga jalơh o maung drơh yuw urang. min amaik amư tian ha hoy praung ka anưk ralo. xanưng atah ciip rabbah pieh ka jalan hadei. war rup drei ka anưk dah bbauk.';
        assert(source, expected);
    });
});

describe('Convert from transliteration to Akhar Thrah', function() {
    beforeEach(function() {
        // Open convert page
        browser.get('http://localhost:8080/#/converter', 50000);
    });

    it('should convert from transliteration EFEO to FontYapata', function() {
        select(convertType.TransCamEFEO, true, convertType.FontYapata, false);
        var source = 'Tamâkai yamân, yamân mbluak xaradang piéh cang xa-ai.';
        var expected = 'tm=k ymN, ymN O)K xrd/ -p`@H c/ x=I.';
        assert(source, expected);
    });

    it('should convert from transliteration EFEO to FontYapata 2', function() {
        select(convertType.TransCamEFEO, true, convertType.FontYapata, false);
        var source = 'idung auix auen li-aua ma-aom';
        var expected = 'id~/ a&{X a&@N l{a&% M-a>';
        assert(source, expected);
    });

    it('should convert from transliteration Inrasara to FontYapata', function() {
        select(convertType.TransInrasara, true, convertType.FontYapata, false);
        var source = 'Tamưkai yamưn, yamưn bblwak xaradang pieh cang xa-ai.';
        var expected = 'tm=k ymN, ymN O)K xrd/ -p`@H c/ x=I.';
        assert(source, expected);
    });

    it('should convert from transliteration Inrasara to FontYapata 2', function() {
        select(convertType.TransInrasara, true, convertType.FontYapata, false);
        var source = 'idung awix awơn li-awa ma-aum';
        var expected = 'id~/ a&{X a&@N l{a&% M-a>';
        assert(source, expected);
    });

    it('should convert from transliteration KTT to FontYapata', function() {
        select(convertType.TransKawomTT, true, convertType.FontYapata, false);
        var source = 'Tamưkai yamưưn, yamưưn bblwak xaradang piêh cang xa-ai.';
        var expected = 'tm=k ym%N, ym%N O)K xrd/ -p`@H c/ x=I.';
        assert(source, expected);
    });

    it('should convert from transliteration KTT to FontYapata 2', function() {
        select(convertType.TransKawomTT, true, convertType.FontYapata, false);
        var source = 'ciim idung awix awơn li-awa ma-aoom';
        var expected = 'c`[ id~/ a&{X a&@N l{a&% M-a>';
        assert(source, expected);
    });
});

/* Test case  from Akhar Thrah to Akhar Thrah */
describe('Convert from Akhar Thrah to Akhar Thrah', function() {
    beforeEach(function() {
        // Open convert page
        browser.get('http://localhost:8080/#/converter', 20000);
    });

    // From font Yapata
    it('should convert from FontYapata to FontGilaiPraong', function() {
        select(convertType.FontYapata, false, convertType.FontGilaiPraong, false);
        var source = '=m rw$ pl] ad] =h x=I -n< s% jl%N O$ ikN s% d-n<.';
        var expected = '=m rw$ pl] ad] =h x=i _n< s% jl%N O$ IkN s% d_n<.';
        assert(source, expected);
    });

    it('should convert from FontYapata to FontCamEFEO', function() {
        select(convertType.FontYapata, false, convertType.FontCamEFEO, false);
        var source = '=m rw$ pl] ad] =h x=I -n< s% jl%N O$ ikN s% d-n<.';
        var expected = '`m rv+! plE adE `h s`A On@ S_ jl_. Ó+! ik. S_ dOn@<';
        assert(source, expected);
    });

    it('should convert from FontYapata to FontKTT', function() {
        select(convertType.FontYapata, false, convertType.FontKTT, true);
        var source = '=m rw$ pl] ad] =h x=I -n< s% jl%N O$ ikN s% d-n<.';
        var expected = '=y ;,I u\'S :pS =/ .=? -r$ {^ i\'^R [I "aR {^ p-r$B';
        assert(source, expected);
    });

    it('should convert from FontYapata to FontUniCamKur', function() {
        select(convertType.FontYapata, false, convertType.FontUniCamKur, true);
        var source = '=m rw$ pl] ad] =h x=I -n< s% jl%N O$ ikN s% d-n<.';
        var expected = 'ꨰꨟ ꨣꨥꨮꩃ ꨚꨤꨬ ꨀꨕꨬ ꨰꨨ ꨦꨰꨄ ꨯꨗꨱ ꨧꨩ ꨎꨤꨩꩆ ꨡꨮꩃ ꨁꨆꩆ ꨧꨩ ꨕꨯꨗꨱ꩞';
        assert(source, expected);
    });

    it('should convert from FontYapata to FontUniCamVN', function() {
        select(convertType.FontYapata, false, convertType.FontUniCamVN, true);
        var source = '=m rw$ pl] ad] =h x=I -n< s% jl%N O$ ikN s% d-n<.';
        var expected = 'ꨰꨟ ꨣꨥꨮꩃ ꨚꨤꨬ ꨀꨕꨬ ꨰꨨ ꨦꨰꨄ ꨯꨗꨱ ꨧꨩ ꨎꨤꨩꩆ ꨡꨮꩃ ꨁꨆꩆ ꨧꨩ ꨕꨯꨗꨱ꩞';
        assert(source, expected);
    });

    // From font Gilaipraong
    it('should convert from font Gilaipraong to font Yapata', function() {
        select(convertType.FontGilaiPraong, false, convertType.FontYapata, false);
        var source = '=m rw$ pl] ad] =h x=i _n< s% jl%N O$ IkN s% d_n<.';
        var expected = '=m rw$ pl] ad] =h x=I -n< s% jl%N O$ ikN s% d-n<.';
        assert(source, expected);
    });

    it('should convert from font Gilaipraong to font EFEO', function() {
        select(convertType.FontGilaiPraong, false, convertType.FontCamEFEO, false);
        var source = '=m rw$ pl] ad] =h x=i _n< s% jl%N O$ IkN s% d_n<.';
        var expected = '`m rv+! plE adE `h s`A On@ S_ jl_. Ó+! ik. S_ dOn@<';
        assert(source, expected);
    });

    it('should convert from font Gilaipraong to font Kawom Tuek Tuah', function() {
        select(convertType.FontGilaiPraong, false, convertType.FontKTT, true);
        var source = '=m rw$ pl] ad] =h x=i _n< s% jl%N O$ IkN s% d_n<.';
        var expected = '=y ;,I u\'S :pS =/ .=? -r$ {^ i\'^R [I "aR {^ p-r$B';
        assert(source, expected);
    });

    it('should convert from font Gilaipraong to font Unicode Cam Kur', function() {
        select(convertType.FontGilaiPraong, false, convertType.FontUniCamKur, true);
        var source = '=m rw$ pl] ad] =h x=i _n< s% jl%N O$ IkN s% d_n<.';
        var expected = 'ꨰꨟ ꨣꨥꨮꩃ ꨚꨤꨬ ꨀꨕꨬ ꨰꨨ ꨦꨰꨄ ꨯꨗꨱ ꨧꨩ ꨎꨤꨩꩆ ꨡꨮꩃ ꨁꨆꩆ ꨧꨩ ꨕꨯꨗꨱ꩞';
        assert(source, expected);
    });

    it('should convert from font Gilaipraong to font Unicode Cam VN', function() {
        select(convertType.FontGilaiPraong, false, convertType.FontUniCamVN, true);
        var source = '=m rw$ pl] ad] =h x=i _n< s% jl%N O$ IkN s% d_n<.';
        var expected = 'ꨰꨟ ꨣꨥꨮꩃ ꨚꨤꨬ ꨀꨕꨬ ꨰꨨ ꨦꨰꨄ ꨯꨗꨱ ꨧꨩ ꨎꨤꨩꩆ ꨡꨮꩃ ꨁꨆꩆ ꨧꨩ ꨕꨯꨗꨱ꩞';
        assert(source, expected);
    });

    // From font EFEO
    it('should convert from font EFEO to font Yapata', function() {
        select(convertType.FontCamEFEO, false, convertType.FontYapata, false);
        var source = '`m rv+! plE adE `h s`A On@ S_ jl_. Ó+! ik. S_ dOn@<';
        var expected = '=m rw$ pl] ad] =h x=I -n< s% jl%N O$ ikN s% d-n<.';
        assert(source, expected);
    });

    it('should convert from font EFEO to font Gilaipraong', function() {
        select(convertType.FontCamEFEO, false, convertType.FontGilaiPraong, false);
        var source = '`m rv+! plE adE `h s`A On@ S_ jl_. Ó+! ik. S_ dOn@<';
        var expected = '=m rw$ pl] ad] =h x=i _n< s% jl%N O$ IkN s% d_n<.';
        assert(source, expected);
    });

    it('should convert from font EFEO to font Kawom Tuek Tuah', function() {
        select(convertType.FontCamEFEO, false, convertType.FontKTT, true);
        var source = '`m rv+! plE adE `h s`A On@ S_ jl_. Ó+! ik. S_ dOn@<';
        var expected = '=y ;,I u\'S :pS =/ .=? -r$ {^ i\'^R [I "aR {^ p-r$B';
        assert(source, expected);
    });

    it('should convert from font EFEO to font Unicode Cam Kur', function() {
        select(convertType.FontCamEFEO, false, convertType.FontUniCamKur, true);
        var source = '`m rv+! plE adE `h s`A On@ S_ jl_. Ó+! ik. S_ dOn@<';
        var expected = 'ꨰꨟ ꨣꨥꨮꩃ ꨚꨤꨬ ꨀꨕꨬ ꨰꨨ ꨦꨰꨄ ꨯꨗꨱ ꨧꨩ ꨎꨤꨩꩆ ꨡꨮꩃ ꨁꨆꩆ ꨧꨩ ꨕꨯꨗꨱ꩞';
        assert(source, expected);
    });

    it('should convert from font EFEO to font Unicode Cam VN', function() {
        select(convertType.FontCamEFEO, false, convertType.FontUniCamVN, true);
        var source = '`m rv+! plE adE `h s`A On@ S_ jl_. Ó+! ik. S_ dOn@<';
        var expected = 'ꨰꨟ ꨣꨥꨮꩃ ꨚꨤꨬ ꨀꨕꨬ ꨰꨨ ꨦꨰꨄ ꨯꨗꨱ ꨧꨩ ꨎꨤꨩꩆ ꨡꨮꩃ ꨁꨆꩆ ꨧꨩ ꨕꨯꨗꨱ꩞';
        assert(source, expected);
    });

    // From font Kawom Tuek Tuah
    it('should convert from font Kawom Tuek Tuah to font Yapata', function() {
        select(convertType.FontKTT, true, convertType.FontYapata, false);
        var source = '=y ;,I u\'S :pS =/ .=? -r$ {^ i\'^R [I "aR {^ p-r$B';
        var expected = '=m rw$ pl] ad] =h x=I -n< s% jl%N O$ ikN s% d-n<.';
        assert(source, expected);
    });

    it('should convert from font Kawom Tuek Tuah to font Gilaipraong', function() {
        select(convertType.FontKTT, true, convertType.FontGilaiPraong, false);
        var source = '=y ;,I u\'S :pS =/ .=? -r$ {^ i\'^R [I "aR {^ p-r$B';
        var expected = '=m rw$ pl] ad] =h x=i _n< s% jl%N O$ IkN s% d_n<.';
        assert(source, expected);
    });

    it('should convert from font Kawom Tuek Tuah to font EFEO', function() {
        select(convertType.FontKTT, true, convertType.FontCamEFEO, false);
        var source = '=y ;,I u\'S :pS =/ .=? -r$ {^ i\'^R [I "aR {^ p-r$B';
        var expected = '`m rv+! plE adE `h s`A On@ S_ jl_. Ó+! ik. S_ dOn@<';
        assert(source, expected);
    });

    it('should convert from font Kawom Tuek Tuah to font Unicode Cam Kur', function() {
        select(convertType.FontKTT, true, convertType.FontUniCamKur, true);
        var source = '=y ;,I u\'S :pS =/ .=? -r$ {^ i\'^R [I "aR {^ p-r$B';
        var expected = 'ꨰꨟ ꨣꨥꨮꩃ ꨚꨤꨬ ꨀꨕꨬ ꨰꨨ ꨦꨰꨄ ꨯꨗꨱ ꨧꨩ ꨎꨤꨩꩆ ꨡꨮꩃ ꨁꨆꩆ ꨧꨩ ꨕꨯꨗꨱ꩞';
        assert(source, expected);
    });

    it('should convert from font Kawom Tuek Tuah to font Unicode Cam VN', function() {
        select(convertType.FontKTT, true, convertType.FontUniCamVN, true);
        var source = '=y ;,I u\'S :pS =/ .=? -r$ {^ i\'^R [I "aR {^ p-r$B';
        var expected = 'ꨰꨟ ꨣꨥꨮꩃ ꨚꨤꨬ ꨀꨕꨬ ꨰꨨ ꨦꨰꨄ ꨯꨗꨱ ꨧꨩ ꨎꨤꨩꩆ ꨡꨮꩃ ꨁꨆꩆ ꨧꨩ ꨕꨯꨗꨱ꩞';
        assert(source, expected);
    });

    // From font Unicode Cam Kur
    it('should convert from font Unicode Cam Kur to font Yapata', function() {
        select(convertType.FontUniCamKur, true, convertType.FontYapata, false);
        var source = 'ꨰꨟ ꨣꨥꨮꩃ ꨚꨤꨬ ꨀꨕꨬ ꨰꨨ ꨦꨰꨄ ꨯꨗꨱ ꨧꨩ ꨎꨤꨩꩆ ꨡꨮꩃ ꨁꨆꩆ ꨧꨩ ꨕꨯꨗꨱ꩞';
        var expected = '=m rw$ pl] ad] =h x=I -n< s% jl%N O$ ikN s% d-n<.';
        assert(source, expected);
    });

    it('should convert from font Unicode Cam Kur to font Gilaipraong', function() {
        select(convertType.FontUniCamKur, true, convertType.FontGilaiPraong, false);
        var source = 'ꨰꨟ ꨣꨥꨮꩃ ꨚꨤꨬ ꨀꨕꨬ ꨰꨨ ꨦꨰꨄ ꨯꨗꨱ ꨧꨩ ꨎꨤꨩꩆ ꨡꨮꩃ ꨁꨆꩆ ꨧꨩ ꨕꨯꨗꨱ꩞';
        var expected = '=m rw$ pl] ad] =h x=i _n< s% jl%N O$ IkN s% d_n<.';
        assert(source, expected);
    });

    it('should convert from font Unicode Cam Kur to font EFEO', function() {
        select(convertType.FontUniCamKur, true, convertType.FontCamEFEO, false);
        var source = 'ꨰꨟ ꨣꨥꨮꩃ ꨚꨤꨬ ꨀꨕꨬ ꨰꨨ ꨦꨰꨄ ꨯꨗꨱ ꨧꨩ ꨎꨤꨩꩆ ꨡꨮꩃ ꨁꨆꩆ ꨧꨩ ꨕꨯꨗꨱ꩞';
        var expected = '`m rv+! plE adE `h s`A On@ S_ jl_. Ó+! ik. S_ dOn@<';
        assert(source, expected);
    });

    it('should convert from font Unicode Cam Kur to font Kawom Tuek Tuah', function() {
        select(convertType.FontUniCamKur, true, convertType.FontKTT, true);
        var source = 'ꨰꨟ ꨣꨥꨮꩃ ꨚꨤꨬ ꨀꨕꨬ ꨰꨨ ꨦꨰꨄ ꨯꨗꨱ ꨧꨩ ꨎꨤꨩꩆ ꨡꨮꩃ ꨁꨆꩆ ꨧꨩ ꨕꨯꨗꨱ꩞';
        var expected = '=y ;,I u\'S :pS =/ .=? -r$ {^ i\'^R [I "aR {^ p-r$B';
        assert(source, expected);
    });

    it('should convert from font Unicode Cam Kur to font Unicode Cam VN', function() {
        select(convertType.FontUniCamKur, true, convertType.FontUniCamVN, true);
        var source = 'ꨰꨟ ꨣꨥꨮꩃ ꨚꨤꨬ ꨀꨕꨬ ꨰꨨ ꨦꨰꨄ ꨯꨗꨱ ꨧꨩ ꨎꨤꨩꩆ ꨡꨮꩃ ꨁꨆꩆ ꨧꨩ ꨕꨯꨗꨱ꩞';
        var expected = 'ꨰꨟ ꨣꨥꨮꩃ ꨚꨤꨬ ꨀꨕꨬ ꨰꨨ ꨦꨰꨄ ꨯꨗꨱ ꨧꨩ ꨎꨤꨩꩆ ꨡꨮꩃ ꨁꨆꩆ ꨧꨩ ꨕꨯꨗꨱ꩞';
        assert(source, expected);
    });

    // From font Unicode Cam VN
    it('should convert from font Unicode Cam VN to font Yapata', function() {
        select(convertType.FontUniCamVN, true, convertType.FontYapata, false);
        var source = 'ꨰꨟ ꨣꨥꨮꩃ ꨚꨤꨬ ꨀꨕꨬ ꨰꨨ ꨦꨰꨄ ꨯꨗꨱ ꨧꨩ ꨎꨤꨩꩆ ꨡꨮꩃ ꨁꨆꩆ ꨧꨩ ꨕꨯꨗꨱ꩞';
        var expected = '=m rw$ pl] ad] =h x=I -n< s% jl%N O$ ikN s% d-n<.';
        assert(source, expected);
    });

    it('should convert from font Unicode Cam VN to font Gilaipraong', function() {
        select(convertType.FontUniCamVN, true, convertType.FontGilaiPraong, false);
        var source = 'ꨰꨟ ꨣꨥꨮꩃ ꨚꨤꨬ ꨀꨕꨬ ꨰꨨ ꨦꨰꨄ ꨯꨗꨱ ꨧꨩ ꨎꨤꨩꩆ ꨡꨮꩃ ꨁꨆꩆ ꨧꨩ ꨕꨯꨗꨱ꩞';
        var expected = '=m rw$ pl] ad] =h x=i _n< s% jl%N O$ IkN s% d_n<.';
        assert(source, expected);
    });

    it('should convert from font Unicode Cam VN to font EFEO', function() {
        select(convertType.FontUniCamVN, true, convertType.FontCamEFEO, false);
        var source = 'ꨰꨟ ꨣꨥꨮꩃ ꨚꨤꨬ ꨀꨕꨬ ꨰꨨ ꨦꨰꨄ ꨯꨗꨱ ꨧꨩ ꨎꨤꨩꩆ ꨡꨮꩃ ꨁꨆꩆ ꨧꨩ ꨕꨯꨗꨱ꩞';
        var expected = '`m rv+! plE adE `h s`A On@ S_ jl_. Ó+! ik. S_ dOn@<';
        assert(source, expected);
    });

    it('should convert from font Unicode Cam VN to font Kawom Tuek Tuah', function() {
        select(convertType.FontUniCamVN, true, convertType.FontKTT, true);
        var source = 'ꨰꨟ ꨣꨥꨮꩃ ꨚꨤꨬ ꨀꨕꨬ ꨰꨨ ꨦꨰꨄ ꨯꨗꨱ ꨧꨩ ꨎꨤꨩꩆ ꨡꨮꩃ ꨁꨆꩆ ꨧꨩ ꨕꨯꨗꨱ꩞';
        var expected = '=y ;,I u\'S :pS =/ .=? -r$ {^ i\'^R [I "aR {^ p-r$B';
        assert(source, expected);
    });

    it('should convert from font Unicode Cam VN to font Unicode Cam Kur', function() {
        select(convertType.FontUniCamVN, true, convertType.FontUniCamKur, true);
        var source = 'ꨰꨟ ꨣꨥꨮꩃ ꨚꨤꨬ ꨀꨕꨬ ꨰꨨ ꨦꨰꨄ ꨯꨗꨱ ꨧꨩ ꨎꨤꨩꩆ ꨡꨮꩃ ꨁꨆꩆ ꨧꨩ ꨕꨯꨗꨱ꩞';
        var expected = 'ꨰꨟ ꨣꨥꨮꩃ ꨚꨤꨬ ꨀꨕꨬ ꨰꨨ ꨦꨰꨄ ꨯꨗꨱ ꨧꨩ ꨎꨤꨩꩆ ꨡꨮꩃ ꨁꨆꩆ ꨧꨩ ꨕꨯꨗꨱ꩞';
        assert(source, expected);
    });
});
