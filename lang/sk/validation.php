<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Validation Language Lines
    |--------------------------------------------------------------------------
    |
    | The following language lines contain the default error messages used by
    | the validator class. Some of these rules have multiple versions such
    | as the size rules. Feel free to tweak each of these messages here.
    |
    */

    'accepted' => 'Pole musí byť akceptované.',
    'accepted_if' => 'Pole musí byť akceptované, keď :other je :value.',
    'active_url' => 'Pole musí byť platná URL adresa.',
    'after' => 'Dátum musí byť po :date.',
    'after_or_equal' => 'Hodnota musí byť dátum nasledujúci alebo rovný :date.',
    'alpha' => 'Pole musí obsahovať iba písmená.',
    'alpha_dash' => 'Pole musí obsahovať iba písmená, čísla, pomlčky a podčiarkovníky.',
    'alpha_num' => 'Pole musí obsahovať iba písmená a čísla.',
    'array' => 'Hodnota musí byť pole.',
    'ascii' => 'Hodnota musí obsahovať iba jednobajtové alfanumerické znaky a symboly.',
    'before' => 'Hodnota musí byť dátum pred :date.',
    'before_or_equal' => 'Hodnota musí byť dátum pred alebo rovný :date.',
    'between' => [
        'array' => 'Pole musí obsahovať minimálne :min a maximálne :max položiek.',
        'file' => 'Položka musí mať minimálne :min a maximálne :max kilobajtov.',
        'numeric' => 'Hodnota musí byť medzi :min a :max.',
        'string' => 'Hodnota musí mať minimálne :min a maximálne :max znakov.',
    ],
    'boolean' => 'Hodnota musí byť true alebo false.',
    'confirmed' => 'Heslo sa nezhoduje',
    'current_password' => 'Heslo je nesprávne.',
    'date' => 'Hodnota musí byť validný dátum',
    'date_equals' => 'Hodnota musí byť dátum rovný :date.',
    'date_format' => 'Hodnota sa musí zhodovať s formátom :format.',
    'decimal' => 'Hodnota musí mať :decimal desatinných miest.',
    'declined' => 'Pole :attribute musí byť odmietnuté.',
    'declined_if' => 'Pole :attribute musí byť odmietnuté, keď :other je :value.',
    'different' => 'Hodnota musí líšiť od hodnoty poľa :other.',
    'digits' => 'Pole  musí obsahovať :digits číslic.',
    'digits_between' => 'Hodnota musí mať minimálne :min a maximálne :max číslic.',
    'dimensions' => 'Obrázok má neplatné rozmery .',
    'distinct' => 'Pole má duplicitnú hodnotu.',
    'doesnt_end_with' => 'Hodnota nesmie končiť jedným z nasledujúcich výrazov: :values.',
    'doesnt_start_with' => 'Hodnota sa nesmie začínať jedným z nasledujúcich výrazov: :values.',
    'email' => 'Pole musí byť platná e-mailová adresa.',
    'ends_with' => 'Hodnota musí končiť jedným z nasledujúcich výrazov: :values.',
    'enum' => 'Vybraná hodnota je nesprávna.',
    'exists' => 'Vybraná hodnota je nesprávna.',
    'file' => 'Pole musí byť súbor.',
    'filled' => 'Pole musí byť vyplnené.',
    'gt' => [
        'array' => 'Pole musí obsahovať viac položiek ako :value.',
        'file' => 'Položka musí mať viac ako :value kilobajtov.',
        'numeric' => 'Hodnota musí byť väčšia ako :value.',
        'string' => 'Hodnota musí mať viac ako :value znakov.',
    ],
    'gte' => [
        'array' => 'Pole musí obsahovať :value alebo viac položiek.',
        'file' => 'Položka musí mať :value alebo viac kilobajtov.',
        'numeric' => 'Hodnota musí byť väčšia alebo rovná ako :value.',
        'string' => 'Hodnota musí mať :value alebo viac znakov.',
    ],
    'image' => 'Položka musí byť obrázok.',
    'in' => 'Vybraná hodnota je nesprávna.',
    'in_array' => 'Hodnota sa musí nachádzať v :other.',
    'integer' => 'Hodnota musí byť celé číslo.',
    'ip' => 'Hodnota musí byť platná IP adresa.',
    'ipv4' => 'Hodnota musí byť platná IPv4 adresa.',
    'ipv6' => 'Hodnota musí byť platná IPv6 adresa.',
    'json' => 'Hodnota musí byť platný JSON.',
    'lowercase' => 'Hodnota musí obsahovať iba malé písmená',
    'lt' => [
        'array' => 'Pole musí obsahovať menej ako :value položiek.',
        'file' => 'Položka musí byť menšia ako :value kilobajtov.',
        'numeric' => 'Hodnota musí byť menšia ako :value.',
        'string' => 'Pole musí mať menej ako :value znakov.',
    ],
    'lte' => [
        'array' => 'Pole nesmie obsahovať viac ako :value položiek.',
        'file' => 'Položka musí mať :value alebo menej kilobajtov.',
        'numeric' => 'Hodnota musí byť menšia alebo rovná :value.',
        'string' => 'Hodnota musí mať :value alebo menej znakov.',
    ],
    'mac_address' => 'Hodnota musí byť platná MAC adresa.',
    'max' => [
        'array' => 'Pole nesmie obsahovať viac ako :max položiek.',
        'file' => 'Položka nesmie mať viac ako :max kilobajtov.',
        'numeric' => 'Hodnota nesmie byť väčšia ako :max.',
        'string' => 'Hodnota nesmie mať viac ako :max znakov.',
    ],
    'max_digits' => 'Hodnota nesmie mať viac ako :max číslic.',
    'mimes' => 'Súbor musí byť súbor typu: :values.',
    'mimetypes' => 'Súbor musí byť súbor typu: :values.',
    'min' => [
        'array' => 'Pole musí obsahovať aspoň :min položiek.',
        'file' => 'Položka musí mať aspoň :min kilobajtov.',
        'numeric' => 'Hodnota musí byť aspoň :min.',
        'string' => 'Hodnota musí obsahovať aspoň :min znakov.',
    ],
    'min_digits' => 'Hodnota musí mať aspoň :min číslic.',
    'missing' => 'Pole musí byť nevyplnené.',
    'missing_if' => 'Pole musí byť nevyplnené, keď :other je :value.',
    'missing_unless' => 'Pole musí byť nevyplnené, pokiaľ :other nie je :value.',
    'missing_with' => 'Ak sú vyplnené hodnoty :values, pole musí byť nevyplnené.',
    'missing_with_all' => 'Pole musí byť nevyplnené, ak sú vyplnené hodnoty :values.',
    'multiple_of' => 'Hodnota musí byť násobkom hodnoty :value.',
    'not_in' => 'Vybraná hodnota je neplatná.',
    'not_regex' => 'Formát hodnoty je neplatný.',
    'numeric' => 'Hodnota musí byť číslo.',
    'password' => [
        'letters' => 'Heslo musí obsahovať aspoň jedno písmeno.',
        'mixed' => 'Heslo musí obsahovať aspoň jedno veľké a jedno malé písmeno.',
        'numbers' => 'Heslo musí obsahovať aspoň jedno číslo.',
        'symbols' => 'Heslo musí obsahovať aspoň jeden symbol.',
        'uncompromised' => 'Daníé heslo sa objavilo pri úniku údajov. Vyberte iné.',
    ],
    'present' => 'Pole musí byť prítomné.',
    'prohibited' => 'Pole je zakázané.',
    'prohibited_if' => 'Pole je zakázané, keď :other je :value.',
    'prohibited_unless' => 'Pole je zakázané, pokiaľ :other nemá hodnoty :values.',
    'prohibits' => 'Pole zakazuje prítomnosť :other.',
    'regex' => 'Formát hodnoty je neplatný.',
    'required' => 'Pole je povinné.',
    'required_array_keys' => 'Pole musí obsahovať položky pre: :values.',
    'required_if' => 'Pole je povinné, keď :other má hodnotu :value.',
    'required_if_accepted' => 'Pole je povinné, keď je akceptované :other.',
    'required_unless' => 'Pole je povinné, pokiaľ :other nemá hodnoty :values.',
    'required_with' => 'Pole je povinné, keď sú vybrané hodnoty :values.',
    'required_with_all' => 'Pole je povinné, keď sú vybrané hodnoty :values.',
    'required_without' => 'Pole je povinné, ak hodnoty :values nie sú prítomné.',
    'required_without_all' => 'Pole je povinné, ak nie je prítomná žiadna z hodnôt :values.',
    'same' => 'Hodnota sa musí zhodovať s :other.',
    'size' => [
        'array' => 'Pole musí obsahovať :size položiek.',
        'file' => 'Položka musí mať veľkosť :size kilobajtov.',
        'numeric' => 'Pole musí mať veľkosť :size.',
        'string' => 'Hodnota musí obsahovať :size znakov.',
    ],
    'starts_with' => 'Hodnota musí začínať jednou z nasledujúcich hodnôt: :values.',
    'string' => 'Hodnota musí byť reťazec.',
    'timezone' => 'Hodnota musí byť platné časové pásmo.',
    'unique' => 'Hodnota už bola použitá.',
    'uploaded' => 'Súbor sa nepodarilo stiahnúť',
    'uppercase' => 'Hodnota musí byť vo veľkých písmenách.',
    'url' => 'Hodnota musí byť platná URL adresa.',
    'ulid' => 'Hodnota musí byť platné ULID.',
    'uuid' => 'Hodnota musí byť platné UUID.',

    /*
    |--------------------------------------------------------------------------
    | Custom Validation Language Lines
    |--------------------------------------------------------------------------
    |
    | Here you may specify custom validation messages for attributes using the
    | convention "attribute.rule" to name the lines. This makes it quick to
    | specify a specific custom language line for a given attribute rule.
    |
    */

    'custom' => [
        'attribute-name' => [
            'rule-name' => 'custom-message',
        ],
    ],

    'max_total_file_size' => 'Veľkosť súborov môže byť spolu maximálne :max_size MB',
    'date_in_future' => 'Dátum nemôže byť v budúcnosti',
    'date_in_past' => 'Dátum nemôže byť v minulosti',

    /*
    |--------------------------------------------------------------------------
    | Custom Validation Attributes
    |--------------------------------------------------------------------------
    |
    | The following language lines are used to swap our attribute placeholder
    | with something more reader friendly such as "E-Mail Address" instead
    | of "email". This simply helps us make our message more expressive.
    |
    */

    'attributes' => [],

];
