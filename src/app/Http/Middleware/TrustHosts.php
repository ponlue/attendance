<?php

namespace App\Http\Middleware;

use Illuminate\Http\Middleware\TrustHosts as Middleware;

class TrustHosts extends Middleware
{
    /**
     * Get the host patterns that should be trusted.
     *
     * @return array<int, string|null>
     */
    /*public function hosts(): array
    {
        return [
            $this->allSubdomainsOfApplicationUrl(),
        ];
    }
        */
    protected function hosts()
    {
        return [
            'backend.kriss.messi.today',
            'phpmyadmin.kriss.messi.today',
            'kriss.messi.today'
        ];
    }

}
