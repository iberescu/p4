<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    public function user() {
        # Project belongs to User
        # Define an inverse one-to-many relationship.
        return $this->belongsTo('\App\User');
	}
    
}

