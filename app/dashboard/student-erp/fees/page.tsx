'use client';

import React from 'react';
import { PageHeader } from '@/components/layout/PageHeader';
import { IndianRupee, CreditCard, Clock, Receipt, CheckCircle, Download, ArrowRight, Wallet, History, SendHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/Button';

const feeItems = [
  { id: 1, title: 'Tuition Fee - Sem 06', amount: 45000, paid: 45000, status: 'fully-paid', due: 'Paid', date: 'Aug 12, 2026' },
  { id: 2, title: 'Library & Infrastructure', amount: 12000, paid: 12000, status: 'fully-paid', due: 'Paid', date: 'Aug 12, 2026' },
  { id: 3, title: 'Examination Fee - MID 1', amount: 3500, paid: 3500, status: 'fully-paid', due: 'Paid', date: 'Sep 05, 2026' },
  { id: 4, title: 'Bus/Transportation Fee', amount: 18000, paid: 0, status: 'pending', due: 'Oct 05, 2026', date: 'N/A' },
];

const transactions = [
  { id: 'TXN89123', type: 'Credit Card', date: 'Sep 05, 2026', amount: 3500, status: 'Success' },
  { id: 'TXN87654', type: 'UPI Payment', date: 'Aug 12, 2026', amount: 57000, status: 'Success' },
];

export default function StudentERPFees() {
  return (
    <div className="p-8 space-y-8">
      <PageHeader 
        title="Fee Management"
        subtitle="Securely manage your academic payments, installments, and download receipts."
      />

      <div className="grid lg:grid-cols-12 gap-8">
        
        {/* Left Column - Active Fees */}
        <div className="lg:col-span-8 space-y-8">
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-rose-600 p-8 rounded-[2.5rem] text-white shadow-xl shadow-rose-900/10 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
                <h4 className="text-rose-100 font-bold text-[10px] uppercase tracking-widest mb-2">Amount Due</h4>
                <div className="text-5xl font-black mb-1">₹18,000</div>
                <p className="text-rose-100 text-xs flex items-center gap-1 font-medium font-bold uppercase tracking-widest mt-2">
                    Next Due: Oct 05, 2026
                </p>
                <div className="absolute top-8 right-8 animate-pulse text-white/30"><Wallet size={32} /></div>
                <button className="mt-8 text-xs font-black uppercase tracking-widest bg-white text-rose-600 px-6 py-3 rounded-2xl flex items-center gap-2 hover:bg-rose-50 transition-colors shadow-lg">
                    Pay Now <SendHorizontal size={14} />
                </button>
            </div>

            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 blur-2xl rounded-full"></div>
                <h4 className="text-slate-400 font-bold text-[10px] uppercase tracking-widest mb-2">Academic Year Paid</h4>
                <div className="text-5xl font-black text-slate-800 mb-1">₹60,500</div>
                <div className="flex items-center gap-2 text-emerald-500 text-xs font-black uppercase tracking-widest mt-2">
                    <CheckCircle size={14} /> No Dues Certificate Enabled
                </div>
                <div className="absolute top-8 right-8 text-emerald-100 group-hover:scale-110 transition-transform"><CheckCircle size={32} /></div>
                <button className="mt-8 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-indigo-600 transition-colors flex items-center gap-2">
                    View Fee Structure <ArrowRight size={14} />
                </button>
            </div>
          </div>

          <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm">
            <h3 className="text-xl font-bold text-slate-800 mb-8 flex items-center gap-2">
                <Receipt className="text-indigo-600" size={24} /> Pending & Recent Fees
            </h3>
            <div className="space-y-4">
               {feeItems.map((item) => (
                    <div key={item.id} className="bg-slate-50/50 p-6 rounded-3xl flex flex-col md:flex-row md:items-center justify-between border border-transparent hover:border-slate-100 hover:bg-white transition-all group">
                         <div className="flex items-center gap-6">
                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${
                                item.status === 'fully-paid' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
                            }`}>
                                <IndianRupee size={24} />
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-800 leading-tight mb-1">{item.title}</h4>
                                <div className="flex items-center gap-3">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Total: ₹{item.amount.toLocaleString()}</span>
                                    <span className="w-1 h-1 bg-slate-200 rounded-full"></span>
                                    <span className={`text-[10px] font-black uppercase tracking-widest ${
                                        item.status === 'fully-paid' ? 'text-emerald-500' : 'text-rose-500 underline'
                                    }`}>{item.status === 'fully-paid' ? 'Paid' : 'Unpaid'}</span>
                                </div>
                            </div>
                         </div>
                         <div className="flex items-center justify-between md:justify-end gap-10 mt-6 md:mt-0 pt-4 md:pt-0 border-t md:border-t-0 border-slate-100/50">
                            <div className="text-right">
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-300">Amount Due</p>
                                <p className={`text-xl font-black tracking-tighter ${
                                    item.status === 'fully-paid' ? 'text-slate-400 opacity-60' : 'text-rose-600'
                                }`}>₹{(item.amount - item.paid).toLocaleString()}</p>
                            </div>
                            <button className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${
                                item.status === 'fully-paid' ? 'bg-white text-indigo-600 shadow-sm border border-slate-100 hover:scale-110' : 'bg-slate-100 text-slate-300 cursor-not-allowed'
                            }`}>
                                <Download size={20} />
                            </button>
                         </div>
                    </div>
               ))}
            </div>
          </div>
        </div>

        {/* Right Column - Statements */}
        <div className="lg:col-span-4 space-y-8">
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center justify-between">
                    Statement History
                    <History className="text-indigo-400" size={20} />
                </h3>
                <div className="space-y-6">
                    {transactions.map((txn) => (
                        <div key={txn.id} className="flex gap-4 group cursor-pointer">
                            <div className="relative">
                                <div className="w-1.5 h-full bg-slate-50 absolute left-1/2 -ml-[0.75px] rounded-full group-last:h-4"></div>
                                <div className="w-8 h-8 rounded-full bg-emerald-500 border-4 border-white flex items-center justify-center text-white relative z-10">
                                    <CheckCircle size={14} strokeWidth={4} />
                                </div>
                            </div>
                            <div className="flex-1 pb-6 group-last:pb-0">
                                <div className="flex justify-between items-start mb-1">
                                    <h5 className="text-sm font-bold text-slate-800">{txn.type}</h5>
                                    <span className="text-xs font-black text-slate-900 tracking-tighter">₹{txn.amount.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{txn.date}</p>
                                    <span className="text-[10px] text-emerald-500 font-black uppercase tracking-widest">{txn.status}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-indigo-900 text-white p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden text-center group">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-3xl rounded-full"></div>
                 <h1 className="text-5xl font-black mb-4 opacity-10">?</h1>
                 <h4 className="font-bold text-lg mb-4">Request Installment?</h4>
                 <p className="text-indigo-300 text-xs leading-relaxed mb-10">
                    Need extra time to pay the Transportation fee? Apply for a monthly installment plan through the student welfare office portal.
                 </p>
                 <Button className="w-full bg-white text-indigo-900 hover:bg-slate-100 font-black text-xs py-4 rounded-2xl shadow-xl shadow-black/20">
                    Apply for EMIs
                 </Button>
            </div>
        </div>
      </div>
    </div>
  );
}
