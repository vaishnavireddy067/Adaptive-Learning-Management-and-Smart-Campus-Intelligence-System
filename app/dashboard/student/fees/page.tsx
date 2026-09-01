'use client';

import React, { useEffect, useState } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { PageHeader } from '@/components/layout/PageHeader';
import { Button } from '@/components/ui/Button';
import { CreditCard, CheckCircle, Clock, AlertCircle, Shield, ChevronRight, Download, Smartphone, Building2, Wallet } from 'lucide-react';

const INITIAL_FEE_SCHEDULE = [
    { semester: 'Semester 5 (Current)', tuition: 35000, exam: 2500, lab: 4000, transport: 3500, total: 45000, paid: 45000, due: 0, dueDate: '—', status: 'Paid' },
    { semester: 'Semester 6 (Upcoming)', tuition: 35000, exam: 2500, lab: 4000, transport: 3500, total: 45000, paid: 0, due: 45000, dueDate: 'Jul 15, 2026', status: 'Upcoming' },
];

const PAYMENT_HISTORY = [
    { id: 'TXN8821', desc: 'Semester 5 – Full Fee', amount: 45000, date: 'Aug 10, 2025', method: 'UPI', ref: 'UPI2025081023A' },
    { id: 'TXN7234', desc: 'Semester 4 – Full Fee', amount: 42000, date: 'Jan 12, 2025', method: 'Net Banking', ref: 'NB2025011289C' },
    { id: 'TXN6102', desc: 'Semester 3 – Full Fee', amount: 42000, date: 'Jul 8, 2024', method: 'Card', ref: 'CD2024070812B' },
];

const PAYMENT_METHODS = [
    { id: 'upi', label: 'UPI', icon: Smartphone, desc: 'Google Pay, PhonePe, Paytm' },
    { id: 'card', label: 'Credit/Debit Card', icon: CreditCard, desc: 'Visa, Mastercard, RuPay' },
    { id: 'netbanking', label: 'Net Banking', icon: Building2, desc: 'SBI, HDFC, ICICI & more' },
    { id: 'wallet', label: 'Wallet', icon: Wallet, desc: 'Paytm, Amazon Pay' },
];

export default function FeePaymentPage() {
    const [selectedMethod, setSelectedMethod] = useState('upi');
    const [step, setStep] = useState<'overview' | 'pay' | 'success'>('overview');
    const [upiId, setUpiId] = useState('');
    const [feeSchedule, setFeeSchedule] = useState(INITIAL_FEE_SCHEDULE);

    useEffect(() => {
        let isMounted = true;
        fetch('/api/fees', { credentials: 'include' })
            .then(res => res.json())
            .then(data => {
                if (isMounted && Array.isArray(data) && data.length > 0) {
                    const mapped = data.map((item: any) => ({
                        semester: item.semester,
                        tuition: Math.round(item.totalAmount * 0.8),
                        exam: 2500,
                        lab: 4000,
                        transport: 3500,
                        total: item.totalAmount,
                        paid: item.paidAmount,
                        due: item.totalAmount - item.paidAmount,
                        dueDate: item.dueDate,
                        status: item.status === 'paid' ? 'Paid' : 'Upcoming'
                    }));
                    setFeeSchedule(mapped);
                }
            })
            .catch(() => {});
        return () => { isMounted = false; };
    }, []);

    const totalPaid = PAYMENT_HISTORY.reduce((a, p) => a + p.amount, 0);

    const handlePay = () => {
        if (!upiId && selectedMethod === 'upi') { alert('Please enter your UPI ID.'); return; }
        setStep('success');
    };

    if (step === 'success') {
        return (
            <div className="flex min-h-screen bg-slate-50">
                <Sidebar />
                <main className="flex-1 ml-64 p-8 flex items-center justify-center">
                    <div className="text-center max-w-md">
                        <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <CheckCircle size={48} className="text-emerald-600" />
                        </div>
                        <h2 className="text-3xl font-black text-slate-800 mb-2">Payment Successful!</h2>
                        <p className="text-slate-500 mb-6">Your fee payment of <strong>₹45,000</strong> has been processed.</p>
                        <div className="bg-white rounded-2xl border border-slate-200 p-5 text-left mb-6 space-y-3">
                            <div className="flex justify-between text-sm"><span className="text-slate-500">Transaction ID</span><span className="font-bold font-mono">TXN{Math.floor(Math.random() * 9999)}</span></div>
                            <div className="flex justify-between text-sm"><span className="text-slate-500">Date</span><span className="font-bold">Mar 26, 2026</span></div>
                            <div className="flex justify-between text-sm"><span className="text-slate-500">Status</span><span className="font-bold text-emerald-600">Paid</span></div>
                        </div>
                        <Button onClick={() => setStep('overview')} className="w-full">Back to Fee Dashboard</Button>
                    </div>
                </main>
            </div>
        );
    }

    if (step === 'pay') {
        return (
            <div className="flex min-h-screen bg-slate-50">
                <Sidebar />
                <main className="flex-1 ml-64 p-8">
                    <PageHeader title="Pay Fees" subtitle="Complete your fee payment securely." />
                    <div className="max-w-2xl mt-6 space-y-6">
                        {/* Amount */}
                        <div className="bg-slate-900 text-white p-6 rounded-3xl shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-40 h-40 bg-indigo-500/20 blur-3xl rounded-full" />
                            <p className="text-slate-400 text-sm mb-1">Amount Due</p>
                            <p className="text-5xl font-black mb-4">₹45,000</p>
                            <p className="text-slate-400 text-xs">Semester 6 (Jul–Dec 2026) • Due: Jul 15, 2026</p>
                        </div>

                        {/* Payment Methods */}
                        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
                            <h3 className="font-black text-slate-800 mb-4">Choose Payment Method</h3>
                            <div className="grid grid-cols-2 gap-3 mb-6">
                                {PAYMENT_METHODS.map(m => (
                                    <button key={m.id} onClick={() => setSelectedMethod(m.id)}
                                        className={`flex items-center gap-3 p-4 rounded-2xl border-2 text-left transition-all ${selectedMethod === m.id ? 'border-indigo-500 bg-indigo-50' : 'border-slate-200 hover:border-slate-300'}`}>
                                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${selectedMethod === m.id ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-500'}`}>
                                            <m.icon size={18} />
                                        </div>
                                        <div>
                                            <p className="font-bold text-sm text-slate-800">{m.label}</p>
                                            <p className="text-[10px] text-slate-400">{m.desc}</p>
                                        </div>
                                    </button>
                                ))}
                            </div>

                            {selectedMethod === 'upi' && (
                                <div className="mb-4">
                                    <label className="text-xs font-black text-slate-500 uppercase tracking-widest block mb-2">Enter UPI ID</label>
                                    <input value={upiId} onChange={e => setUpiId(e.target.value)}
                                        placeholder="yourname@upi"
                                        className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-400" />
                                </div>
                            )}

                            <div className="flex items-center gap-2 text-xs text-slate-400 mb-5">
                                <Shield size={14} className="text-emerald-500" />
                                256-bit SSL encrypted. Your payment is fully secured.
                            </div>

                            <div className="flex gap-3">
                                <Button variant="outline" onClick={() => setStep('overview')} className="flex-1">Cancel</Button>
                                <Button onClick={handlePay} className="flex-1 bg-indigo-600 hover:bg-indigo-700">
                                    Pay ₹45,000
                                </Button>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen bg-slate-50">
            <Sidebar />
            <main className="flex-1 ml-64 p-8">
                <PageHeader title="Fee Payment" subtitle="Track your tuition fees, dues, and payment history." />

                <div className="grid grid-cols-3 gap-5 mt-4 mb-8">
                    {[
                        { label: 'Total Paid', value: `₹${totalPaid.toLocaleString()}`, icon: CheckCircle, color: 'emerald' },
                        { label: 'Current Due', value: '₹0', icon: Clock, color: 'indigo', sub: 'Sem 5 fully paid' },
                        { label: 'Upcoming', value: '₹45,000', icon: AlertCircle, color: 'amber', sub: 'Sem 6 • Jul 15' },
                    ].map((s, i) => (
                        <div key={i} className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 flex items-center gap-4">
                            <div className={`w-12 h-12 rounded-2xl bg-${s.color}-50 text-${s.color}-600 flex items-center justify-center shrink-0`}>
                                <s.icon size={22} />
                            </div>
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{s.label}</p>
                                <p className={`text-2xl font-black text-${s.color}-600 mt-0.5`}>{s.value}</p>
                                {s.sub && <p className="text-[10px] text-slate-400">{s.sub}</p>}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Fee Schedule */}
                <div className="space-y-4 mb-8">
                    {feeSchedule.map((f, i) => (
                        <div key={i} className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="font-black text-slate-800 text-lg">{f.semester}</h3>
                                    <p className="text-xs text-slate-400 mt-0.5">Due Date: {f.dueDate}</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className={`text-[10px] font-black px-3 py-1 rounded-full border ${f.status === 'Paid' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-amber-50 text-amber-700 border-amber-200'}`}>
                                        {f.status}
                                    </span>
                                    {f.status !== 'Paid' && (
                                        <Button onClick={() => setStep('pay')}>
                                            Pay Now <ChevronRight size={15} className="ml-1" />
                                        </Button>
                                    )}
                                </div>
                            </div>
                            <div className="grid grid-cols-4 gap-4">
                                {[
                                    { label: 'Tuition', value: f.tuition },
                                    { label: 'Exam Fee', value: f.exam },
                                    { label: 'Lab Fee', value: f.lab },
                                    { label: 'Transport', value: f.transport },
                                ].map((item, j) => (
                                    <div key={j} className="bg-slate-50 rounded-2xl p-4">
                                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{item.label}</p>
                                        <p className="text-lg font-black text-slate-800 mt-1">₹{item.value.toLocaleString()}</p>
                                    </div>
                                ))}
                            </div>
                            {f.status === 'Paid' && (
                                <div className="mt-4 w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                                    <div className="h-full bg-emerald-500 rounded-full w-full" />
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Payment History */}
                <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="p-5 border-b border-slate-100 flex justify-between items-center">
                        <h3 className="font-black text-slate-800">Payment History</h3>
                        <Button variant="outline" onClick={() => alert('Downloading receipt...')}><Download size={14} className="mr-2" /> Receipts</Button>
                    </div>
                    <div className="divide-y divide-slate-50">
                        {PAYMENT_HISTORY.map((p, i) => (
                            <div key={i} className="flex items-center gap-4 px-6 py-4 hover:bg-slate-50/50 transition-colors">
                                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                                    <CheckCircle size={18} />
                                </div>
                                <div className="flex-1">
                                    <p className="font-bold text-sm text-slate-800">{p.desc}</p>
                                    <p className="text-[10px] text-slate-400">{p.date} • {p.method} • Ref: {p.ref}</p>
                                </div>
                                <p className="font-black text-emerald-600">₹{p.amount.toLocaleString()}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}
