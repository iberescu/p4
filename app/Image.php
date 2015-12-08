<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Image extends Model
{
    public function user() {
        # Image belongs to User
        # Define an inverse one-to-many relationship.
        return $this->belongsTo('\App\User');
    }
}
